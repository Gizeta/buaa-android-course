package org.gizeta.clarinetto;

import android.content.Context;
import android.database.Cursor;
import android.media.MediaPlayer;
import android.provider.MediaStore;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

public class Backend {
    private ArrayList<HashMap<String, Object>> musicList;
    private MediaPlayer mediaPlayer;
    private int playingIndex = -1;
    public JsInterface jsBackend;

    public Backend() {
        musicList = new ArrayList<HashMap<String, Object>>();
        mediaPlayer = new MediaPlayer();

        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                jsBackend.PlayNext();
            }
        });
        Timer timer = new Timer();
        timer.schedule(new MediaPositionTask(), 0, 400);
    }

    public void LoadMusicList(Context context) {
        musicList.clear();

        Cursor cursor = context.getContentResolver().query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, null, null, null,
                MediaStore.Audio.Media.DEFAULT_SORT_ORDER);
        if (cursor.moveToFirst()) {
            do {
                HashMap<String, Object> song = new HashMap<String, Object>();
                song.put("title", cursor.getString((cursor.getColumnIndex(MediaStore.Audio.Media.TITLE))));
                song.put("artist", cursor.getString((cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST))));
                song.put("duration", cursor.getLong((cursor.getColumnIndex(MediaStore.Audio.Media.DURATION))));
                song.put("url", cursor.getString((cursor.getColumnIndex(MediaStore.Audio.Media.DATA))));

                if (cursor.getInt(cursor.getColumnIndex(MediaStore.Audio.Media.IS_MUSIC)) != 0) {
                    musicList.add(song);
                }
            } while (cursor.moveToNext());

            cursor.close();
        }
    }

    public void Play() {
        mediaPlayer.start();

        updateState();
    }

    public void Pause() {
        mediaPlayer.pause();

        updateState();
    }

    public void Load(int idx) {
        if (idx < 0 || idx >= musicList.size()) return;
        try {
            mediaPlayer.reset();
            mediaPlayer.setDataSource((String) musicList.get(idx).get("url"));
            mediaPlayer.prepare();
            playingIndex = idx;
        }
        catch (IOException ex) { }

        updateMusicInfo();
    }

    public void LoadPrevious() {
        playingIndex--;
        if (playingIndex < 0) {
            playingIndex = musicList.size() - 1;
        }
        Load(playingIndex);
    }

    public void LoadNext() {
        playingIndex++;
        if (playingIndex >= musicList.size()) {
            playingIndex = 0;
        }
        Load(playingIndex);
    }

    private void updateMusicInfo() {
        String title = playingIndex == -1 ? "" : (String)musicList.get(playingIndex).get("title");
        String artist = playingIndex == -1 ? "" : (String)musicList.get(playingIndex).get("artist");
        int duration = mediaPlayer.getDuration();

        jsBackend.Execute("Clarinetto.controls.cover.setProps({title:\"" + title + "\",artist:\"" + artist +"\"});"
                        + "Clarinetto.controls.control.setProps({duration:" + duration + "});"
                        + "Clarinetto.controls.playlist.setProps({now:" + playingIndex + "});");
    }

    private void updatePosition() {
        int position = mediaPlayer.getCurrentPosition();
        jsBackend.Execute("Clarinetto.controls.control.setProps({position:" + String.valueOf(position) + "});");
    }

    private void updateState() {
        boolean isPlaying = mediaPlayer.isPlaying();
        jsBackend.Execute("Clarinetto.controls.control.setProps({isPlaying:" + String.valueOf(isPlaying) + "});");
    }

    public void updateMusicList() {
        String arr = "";
        for (int i = 0; i < musicList.size(); i++) {
            arr += "{title:\"" + (String)musicList.get(i).get("title") + "\",";
            arr += "artist:\"" + (String)musicList.get(i).get("artist") + "\"},";
        }
        jsBackend.Execute("Clarinetto.controls.playlist.setProps({list:[" + arr + "]})");
    }

    public class MediaPositionTask extends TimerTask {
        public void run() {
            if (mediaPlayer.isPlaying()) {
                updatePosition();
            }
        }
    }
}
