<template>
  <div class="singer" ref="singer">
    <listview ref="list" :data="singers" @select="selectSinger"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
  import Listview from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerlist()
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerlist() {
        getSingerList()
          .then((res) => {
            if (res.code === ERR_OK) {
              this.singers = this._normalizeSinger(res.data.list)
            }
          })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }

          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        //sort
        let ret = [], hot = []
        for (let k in map) {
          let val = map[k]
          if (val.title.match(/[a-zA-Z0-9]/)) {
            ret.push(val)
          } else {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)

      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      Listview
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
