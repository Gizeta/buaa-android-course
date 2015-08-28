package org.gizeta.clarinetto;

import android.content.Context;
import android.webkit.JavascriptInterface;

public class JsInterface {
    private Context mContext;
    public Backend backend;

    public JsInterface(Context c) {
        mContext = c;
    }

    public void Execute(final String code) {
        ((WebPageActivity)mContext).loadJS(code);
    }

    @JavascriptInterface
    public void Play() {
        backend.Play();
    }

    @JavascriptInterface
    public void Pause() {
        backend.Pause();
    }

    @JavascriptInterface
    public void PlayMusic(int idx) {
        backend.Load(idx);
        backend.Play();
    }

    @JavascriptInterface
    public void PlayPrevious() {
        backend.LoadPrevious();
        backend.Play();
    }

    @JavascriptInterface
    public void PlayNext() {
        backend.LoadNext();
        backend.Play();
    }

    @JavascriptInterface
    public void UpdateMusicList() {
        backend.updateMusicList();
    }

    @JavascriptInterface
    public void LoadInitialMusic() {
        backend.Load(0);
    }
}
