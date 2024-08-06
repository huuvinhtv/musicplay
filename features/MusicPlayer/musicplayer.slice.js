import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const musicPlayerSlice = createSlice({
  name: "musicplayer",
  initialState: {
    songs: [
      {
        id: 1,
        name: "Mưa Tháng Sáu",
        artist: "Văn Mai Hương",
        src: "/songs/MuaThangSau-VanMaiHuongGREYDTrungQuanIdol-9534954.mp3",
        img: "/img/1.jpg",
      },
      {
        id: 2,
        name: "Nếu lúc đó",
        artist: "Tlinh",
        src: "/songs/NeuLucDo-tlinh2pillz-8783613.mp3",
        img: "/img/2.jpg",
      },
      {
        id: 3,
        name: "Cô ấy của anh ấy",
        artist: "Bảo Anh",
        src: "/songs/CoAyCuaAnhAy-BaoAnh-9430793.mp3",
        img: "/img/3.jpg",
      },
      {
        id: 4,
        name: "Ngày Mai Người Ta Lấy Chồng",
        artist: "Thành Đạt",
        src: "/songs/NgayMaiNguoiTaLayChong-ThanhDat-9466823.mp3",
        img: "/img/4.jpg",
      },
      {
        id: 5,
        name: "Một Ngày Chẳng Nắng",
        artist: "Pháo",
        src: "/songs/MotNgayChangNang-Phao-9400644.mp3",
        img: "/img/5.jpg",
      },
      {
        id: 6,
        name: "Đưa Em Về Nhà",
        artist: "GREY D, Chillies",
        src: "/songs/DuaEmVeNhaa-GREYDChillies-9214678.mp3",
        img: "/img/6.jpg",
      },
      {
        id: 7,
        name: "Flower",
        artist: "JISOO",
        src: "/songs/Flower-JISOO-8949069.mp3",
        img: "/img/7.jpg",
      },
      {
        id: 8,
        name: "Night Dancer",
        artist: "imase",
        src: "/songs/NightDancer-imase-7928370.mp3",
        img: "/img/8.jpg",
      },
      {
        id: 9,
        name: "Tây Du Kí Remix",
        artist: "Lê Bảo",
        src: "/songs/Tay-Du-Ki-Le-Bao-Remix.mp3",
        img: "/img/9.jpg",
      },
      {
        id: 10,
        name: "Quan Hệ Rộng",
        artist: "Bình Gold",
        src: "/songs/QuanHeRong-BinhGold-6472896.mp3",
        img: "/img/10.jpg",
      },
    ],
    randomSongs: [
      {
        id: 1,
        name: "Mưa Tháng Sáu",
        artist: "Văn Mai Hương",
        src: "/songs/MuaThangSau-VanMaiHuongGREYDTrungQuanIdol-9534954.mp3",
        img: "/img/1.jpg",
      },
      {
        id: 2,
        name: "Nếu lúc đó",
        artist: "Tlinh",
        src: "/songs/NeuLucDo-tlinh2pillz-8783613.mp3",
        img: "/img/2.jpg",
      },
      {
        id: 3,
        name: "Cô ấy của anh ấy",
        artist: "Bảo Anh",
        src: "/songs/CoAyCuaAnhAy-BaoAnh-9430793.mp3",
        img: "/img/3.jpg",
      },
      {
        id: 4,
        name: "Ngày Mai Người Ta Lấy Chồng",
        artist: "Thành Đạt",
        src: "/songs/NgayMaiNguoiTaLayChong-ThanhDat-9466823.mp3",
        img: "/img/4.jpg",
      },
      {
        id: 5,
        name: "Một Ngày Chẳng Nắng",
        artist: "Pháo",
        src: "/songs/MotNgayChangNang-Phao-9400644.mp3",
        img: "/img/5.jpg",
      },
      {
        id: 6,
        name: "Đưa Em Về Nhà",
        artist: "GREY D, Chillies",
        src: "/songs/DuaEmVeNhaa-GREYDChillies-9214678.mp3",
        img: "/img/6.jpg",
      },
      {
        id: 7,
        name: "Flower",
        artist: "JISOO",
        src: "/songs/Flower-JISOO-8949069.mp3",
        img: "/img/7.jpg",
      },
      {
        id: 8,
        name: "Night Dancer",
        artist: "imase",
        src: "/songs/NightDancer-imase-7928370.mp3",
        img: "/img/8.jpg",
      },
      {
        id: 9,
        name: "Tây Du Kí Remix",
        artist: "Lê Bảo",
        src: "/songs/Tay-Du-Ki-Le-Bao-Remix.mp3",
        img: "/img/9.jpg",
      },
      {
        id: 10,
        name: "Quan Hệ Rộng",
        artist: "Bình Gold",
        src: "/songs/QuanHeRong-BinhGold-6472896.mp3",
        img: "/img/10.jpg",
      },
    ],
    current: 0,
    isPlaying: false,
    volume: 1,
    loop: "no",
    shuffle: false,
    currentTime: 0,
    durationTime: 0,
    openMusicList: false,
  },
  reducers: {
    play(state, action) {
      state.isPlaying = true;
    },
    pause(state, action) {
      state.isPlaying = false;
    },
    next(state, action) {
      switch (state.loop) {
        case "no":
          if (state.current < state.songs.length - 1) {
            state.current++;
          } else {
            state.current = 0;
          }
          state.isPlaying = true;
          break;
        case "one":
          if (state.current < state.songs.length - 1) {
            state.current++;
          } else {
            state.current = 0;
          }
          state.loop = "all";
          state.isPlaying = true;
          break;
        default:
          if (state.current < state.songs.length - 1) {
            state.current++;
          } else {
            state.current = 0;
          }
          state.isPlaying = true;
      }
    },
    prev(state, action) {
      switch (state.loop) {
        case "no":
          if (state.current > 0) {
            state.current--;
            state.isPlaying = true;
          } else {
            state.current = state.songs.length - 1;
          }
          break;
        case "one":
          if (state.current > 0) {
            state.current--;
          } else {
            state.current = state.songs.length - 1;
          }
          state.loop = "all";
          state.isPlaying = true;
          break;
        default:
          if (state.current > 0) {
            state.current--;
          } else {
            state.current = state.songs.length - 1;
          }
          state.isPlaying = true;
      }
    },
    changeLoop(state, action) {
      switch (state.loop) {
        case "no":
          state.loop = "one";
          break;
        case "one":
          state.loop = "all";
          break;
        default:
          state.loop = "no";
      }
    },
    setShuffle(state, action) {
      state.shuffle = !state.shuffle;
    },
    setRandomSongs(state, action) {
      state.randomSongs = action.payload.value;
    },
    setCurrent(state, action) {
      state.current = action.payload.id;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload.value;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload.value;
    },
    setDuration(state, action) {
      state.durationTime = action.payload.value;
    },
    setVolume(state, action) {
      state.volume = action.payload.value;
    },
    setOpenMusicList(state, action) {
      state.openMusicList = action.payload.value;
    },
  },
});

const musicPlayerReducer = musicPlayerSlice.reducer;
export default musicPlayerReducer;
export const musicPlayerActions = musicPlayerSlice.actions;

export const useMusicPlayer = () => {
  const {
    songs,
    randomSongs,
    current,
    isPlaying,
    volume,
    loop,
    shuffle,
    currentTime,
    durationTime,
    openMusicList,
  } = useSelector((state) => state.musicplayer);
  const currentSong = randomSongs.find((song, index) => {
    if (index === current) {
      return song;
    }
  });
  const dispatch = useDispatch();
  return {
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
    play() {
      dispatch(musicPlayerActions.play());
    },
    pause() {
      dispatch(musicPlayerActions.pause());
    },
    next() {
      dispatch(musicPlayerActions.next());
    },
    prev() {
      dispatch(musicPlayerActions.prev());
    },
    changeLoop() {
      dispatch(musicPlayerActions.changeLoop());
    },
    setCurrent(id) {
      dispatch(musicPlayerActions.setCurrent({ id }));
    },
    setIsPlaying(value) {
      dispatch(musicPlayerActions.setIsPlaying({ value }));
    },
    setCurrentTime(value) {
      dispatch(musicPlayerActions.setCurrentTime({ value }));
    },
    setDuration(value) {
      dispatch(musicPlayerActions.setDuration({ value }));
    },
    setVolume(value) {
      dispatch(musicPlayerActions.setVolume({ value }));
    },
    setShuffle() {
      dispatch(musicPlayerActions.setShuffle());
    },
    setRandomSongs(value) {
      dispatch(musicPlayerActions.setRandomSongs({ value }));
    },
    setOpenMusicList(value) {
      dispatch(musicPlayerActions.setOpenMusicList({ value }));
    },
  };
};
