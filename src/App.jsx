import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMusicPlayer } from "./features/MusicPlayer/musicplayer.slice";
function App() {
  const {
    songs,
    randomSongs,
    current,
    currentSong,
    isPlaying,
    volume,
    loop,
    shuffle,
    currentTime,
    durationTime,
    openMusicList,
    play,
    pause,
    next,
    prev,
    changeLoop,
    setCurrent,
    setIsPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    setShuffle,
    setRandomSongs,
    setOpenMusicList,
  } = useMusicPlayer();

  const musicRef = useRef(new Audio());

  useEffect(() => {
    document.title = currentSong.name;
  }, [currentSong]);

  useEffect(() => {
    musicRef.current.src = currentSong.src;
    if (isPlaying) {
      musicRef.current.play();
    }
  }, [currentSong]);
  useEffect(() => {
    musicRef.current.volume = volume;
  }, [volume]);
  const handleUpdateTime = () => {
    setCurrentTime(musicRef.current.currentTime);
  };
  useEffect(() => {
    musicRef.current.ondurationchange = function (e) {
      setDuration(musicRef.current.duration);
    };
    musicRef.current.ontimeupdate = handleUpdateTime;
  }, []);
  useEffect(() => {
    if (currentTime > 0 && currentTime === durationTime) {
      if (loop === "one") {
        setCurrentTime(0);
        musicRef.current.currentTime = 0;
        musicRef.current.play();
      } else if (loop === "all") {
        setCurrentTime(0);
        musicRef.current.currentTime = 0;
        next();
      } else if (loop === "no") {
        if (current < songs.length - 1) {
          next();
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
          musicRef.current.currentTime = 0;
        }
      }
    }
  }, [currentTime]);
  useEffect(() => {
    if (isPlaying) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const randomArr = (arr) => {
      let result = [];
      let usedIndex = [];
      let i = 0;
      while (i < arr.length) {
        let x = Math.floor(Math.random() * arr.length);
        if (!usedIndex.includes(x)) {
          result.push(arr[x]);
          usedIndex.push(x);
          i++;
        }
      }
      return result;
    };
    if (shuffle) {
      let x = randomArr(songs);
      let y = x.indexOf(songs[current]);
      setRandomSongs(x);
      setCurrent(y);
    } else {
      let y = songs.indexOf(randomSongs[current]);
      setRandomSongs(songs);
      if (y >= 0) {
        setCurrent(y);
      }
    }
  }, [shuffle]);
  const handleChangeTime = (e) => {
    setCurrentTime(e.target.value);
    musicRef.current.currentTime = e.target.value;
  };
  const handleChangeVolume = (e) => {
    setVolume(Number(e.target.value));
    musicRef.current.volume = e.target.value;
  };
  const caculateTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = secs - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-wrap">
      <div className="music">
        <div className="music-info">
          <div className={`music-info-img ${isPlaying ? "active" : ""}`}>
            <img src={currentSong.img} alt="" />
          </div>
          <div className="music-info-des">
            <div className="music-info-name">{currentSong.name}</div>
            <div className="music-info-artis">{currentSong.artist}</div>
          </div>
          <div className="music-info-favorite">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
            </svg>
          </div>
        </div>
        <div className="music-player">
          <div className="music-player-button">
            <div
              className={`music-player-button-item ${shuffle ? "active" : ""}`}
              onClick={setShuffle}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 17h-1.559l-9.7-10.673A1 1 0 0 0 5.001 6H2v2h2.559l4.09 4.5-4.09 4.501H2v2h3.001a1 1 0 0 0 .74-.327L10 13.987l4.259 4.686a1 1 0 0 0 .74.327H17v3l5-4-5-4v3z"></path>
                <path d="M15.441 8H17v3l5-3.938L17 3v3h-2.001a1 1 0 0 0-.74.327l-3.368 3.707 1.48 1.346L15.441 8z"></path>
              </svg>
            </div>
            <div className="music-player-button-item" onClick={prev}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z" />
              </svg>
            </div>
            <div
              className="music-player-button-item large"
              onClick={isPlaying ? pause : play}
            >
              {isPlaying ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  fontSize={50}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 7h3v10H8zm5 0h3v10h-3z" />
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  fontSize={50}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: 4 }}
                >
                  <path d="M7 6v12l10-6z" />
                </svg>
              )}
            </div>
            <div className="music-player-button-item" onClick={next}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 7v10l7-5zm9 10V7h-2v10z" />
              </svg>
            </div>
            <div
              className={`music-player-button-item ${
                loop === "one" || loop === "all" ? "active" : ""
              }`}
              onClick={changeLoop}
            >
              {loop === "one" ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z" />
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                </svg>
              )}
            </div>
          </div>
          <div className="music-player-time">
            <div className="time-start">
              {caculateTime(Math.floor(currentTime))}
            </div>
            <div className="time-duration-wrap">
              <input
                type="range"
                name=""
                max={Math.floor(durationTime)}
                min={0}
                step={0.1}
                value={currentTime}
                className="time-duration"
                id=""
                onMouseDown={(e) => {
                  musicRef.current.pause();
                }}
                onMouseUp={(e) => {
                  if (isPlaying) {
                    musicRef.current.play();
                  }
                }}
                onChange={(e) => {
                  handleChangeTime(e);
                }}
              />
              <div
                className="progress"
                style={{
                  right: `${
                    100 - (currentTime / durationTime) * 100 > 93
                      ? 100 - (currentTime / durationTime) * 100 - 3.5
                      : 100 - (currentTime / durationTime) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="time-end">
              {caculateTime(Math.floor(durationTime))}
            </div>
          </div>
        </div>
        <div className="music-volume">
          <div
            className="music-volume-icon"
            onClick={() => {
              setVolume(volume === 0 ? 1 : 0);
              musicRef.current.volume = volume === 0 ? 1 : 0;
            }}
          >
            {volume === 0 ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m21.707 20.293-2.023-2.023A9.566 9.566 0 0 0 21.999 12c0-4.091-2.472-7.453-5.999-9v2c2.387 1.386 3.999 4.047 3.999 7a8.113 8.113 0 0 1-1.672 4.913l-1.285-1.285C17.644 14.536 18 13.19 18 12c0-1.771-.775-3.9-2-5v7.586l-2-2V4a1 1 0 0 0-1.554-.832L7.727 6.313l-4.02-4.02-1.414 1.414 18 18 1.414-1.414zM12 5.868v4.718L9.169 7.755 12 5.868zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20v-1.879l-2-2v2.011l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9h.879L3.102 7.223A1.995 1.995 0 0 0 2 9v6c0 1.103.897 2 2 2z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"></path>
                <path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5zM4 17h2.697l5.748 3.832a1.004 1.004 0 0 0 1.027.05A1 1 0 0 0 14 20V4a1 1 0 0 0-1.554-.832L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h3c.033 0 .061-.016.093-.019a1.027 1.027 0 0 0 .38-.116c.026-.015.057-.017.082-.033L12 5.868v12.264l-4.445-2.964c-.025-.017-.056-.02-.082-.033a.986.986 0 0 0-.382-.116C7.059 15.016 7.032 15 7 15H4V9z"></path>
              </svg>
            )}
          </div>
          <div className="volume-duration-wrap">
            <input
              type="range"
              max={1}
              min={0}
              step={0.01}
              name=""
              id=""
              value={volume}
              onChange={(e) => {
                handleChangeVolume(e);
              }}
              className="music-volume-duration"
            />
            <div
              className="volume-progress"
              style={{
                right: `${
                  100 - volume * 100 > 95
                    ? 100 - volume * 100 - 11
                    : 100 - volume * 100
                }%`,
              }}
            ></div>
          </div>
          <div
            className="mobile-list-btn"
            onClick={() => {
              setOpenMusicList(!openMusicList);
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m19.684 5.821-9-3.272A1.998 1.998 0 0 0 8 4.428v6.129A3.953 3.953 0 0 0 6 10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V4.428L19 7.7v6.856A3.962 3.962 0 0 0 17 14c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4V7.7c0-.838-.529-1.594-1.316-1.879zM6 16c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm11 4c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="music-list-wrap">
        <h2>Playlist</h2>
        <div className="music-content">
          <div className="music-now">
            <h4>Now playing</h4>
            <div className="music-now-name">{currentSong.name}</div>
            <div className="music-now-artist">{currentSong.artist}</div>
            <div className="music-now-picture">
              <img src={currentSong.img} alt="" />
            </div>
          </div>
          <div className={`music-list ${openMusicList ? "active" : ""}`}>
            <div className="music-sign">
              <div className="music-sign-item">#</div>
              <div className="music-sign-item">Title</div>
              <div className="music-sign-item">Artist</div>
            </div>
            <div className="music-list-item-wrap">
              {randomSongs.map((item, index) => (
                <div
                  className={`music-list-item ${
                    current === index ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    setCurrent(index);
                  }}
                >
                  <div className="item-wrap">
                    <div className="item icon">
                      {isPlaying === true && current === index ? (
                        <div className="playing">
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                          <div className="stroke"></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </div>{" "}
                    <div
                      className="item-button"
                      onClick={() => {
                        if (isPlaying && current !== index) {
                          setCurrent(index);
                        } else if (isPlaying && current === index) {
                          setIsPlaying(false);
                        } else if (!isPlaying && current === index) {
                          setIsPlaying(true);
                        } else {
                          setIsPlaying(true);
                          setCurrent(index);
                        }
                      }}
                    >
                      {isPlaying && current === index ? (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          fontSize={30}
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 7h3v10H8zm5 0h3v10h-3z" />
                        </svg>
                      ) : (
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          fontSize={30}
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: 4 }}
                        >
                          <path d="M7 6v12l10-6z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="item">{item.name}</div>
                  <div className="item">{item.artist}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
