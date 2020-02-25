export default class Song {
  constructor({ mid, albummid, songname, singers, albumname, interval }) {
    this.mid = mid;
    this.album = {};
    this.album.mid = albummid;
    this.album.name = albumname;
    this.name = songname;
    this.songname = songname;
    // 数组
    this.singer = singers;
    this.interval = interval;
  }
}
