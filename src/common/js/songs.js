import jsonp from 'common/js/jsonp'
import {getSongsUrl} from 'api/singer'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: 'http://dl.stream.qqmusic.qq.com/C400001J5QJL1pRQYB.m4a?vkey=11BE241D563A184897CB139BB181A3C3749042841AD4BE6A696394A9DB804D3C8A722D7B224E006635504E623154DD51A2239AF33F9B4D44&guid=9597458712&uin=247633806&fromtag=66'
  })
}

function filterSinger(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
