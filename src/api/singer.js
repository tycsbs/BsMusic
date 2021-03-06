import jsonp from 'common/js/jsonp'
import {commonParam, options} from './config'

export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParam, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParam, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: id
  })

  return jsonp(url, data, options)
}

export function getSongsUrl(songmid) {
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  let t = (new Date).getUTCMilliseconds()
  let _guid = Math.round(2147483647 * Math.random()) * t % 1e10
  let filename = `C400${songmid}.m4a`

  const data = Object.assign({}, commonParam, {
    jsonpCallback:'MusicJsonCallback6',
    uin: 0,
    guid: _guid,
    songmid: songmid,
    filename:filename,
    format:'jsonp',
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    callback:'MusicJsonCallback6'
  })

  return jsonp(url,data).then((res) => {
     res.guid = _guid
    return res
  })
}

function MusicJsonCallback6 () {

}


