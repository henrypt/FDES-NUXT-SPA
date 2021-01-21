<template>
  <div v-if="isShow" ref="CarouselMenu" class="CarouselMenu">
    <carousel-3d
      ref="carousel_3d"
      :disable3d="false"
      :autoplay="false"
      :display="slides.length"
      :dir="'rtl'"
      :bias="'center'"
      :clickable="true"
      :loop="true"
      :controls-visible="true"
      :controls-prev-html="'&#10092;'"
      :controls-next-html="'&#10093;'"
      :controls-width="100"
      :controls-height="100"
      :perspective="35"
      :start-index="current_index"
      :on-last-slide="onLastSlide"
      :on-main-slide-click="onMainSlideClick"
      @before-slide-change="onBeforeSlideChange"
      @after-slide-change="onAfterSlideChange"
    >
      <slide
        v-for="(slide, i) in slidesInfo"
        :id="slide.id"
        :key="i"
        class="slideMenu"
        :index="i"
        :name="slide.name"
      >
        <template slot-scope="{ index, isCurrent }">
          <img
            :data-index="index"
            :class="{ current: isCurrent }"
            :data-is-current="isCurrent"
            :src="requireImg(slide.src)"
          />

          <!-- <div class="slide_title">{{slide.desc}}</div> -->
        </template>
      </slide>
    </carousel-3d>

    <div class="slide_title" @click="parentResetOrder(0)">
      {{ current_desc }}
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
import { storage } from '../../../assets/js/storage.js'
import { cookie } from '../../../assets/js/cookie.js'

/*
 * menuClass.menuClass1 json data buffer to sessionStorage [menuClass1] after readed from Vuex
 *  1. read json data from Back-end by Vuex+Ajax
 *  2. buffer json data to sessionStorage
 *  3. if page reload, read sessionStorage first, sessionStorage has data read it, if not read from Back-end by Vuex+Ajax
 *
 *  watch -> $route(to, from): watch $route and set cookie for record current classMenu path string
 *
 *  When HeaderTop's component has changed classMenu1:
 *  Method-1:
 *    step 1: Components CarouselMenu and HeaderTop share data 'classMenu' by Vuex
 *    step 2: then CarouselMenu update slidesInfo from Vuex
 *
 *  Method-2: (using it)
 *    step 1: Watch $route, get route info
 *    step 2: Using route path(t1, t2...) and sync-slidesInfo
 *
 */

export default {
  name: 'CarouselMenu',
  components: {
    Carousel3d,
    Slide
  },
  props: {
    s: {
      type: [Array, Object],
      default: null,
      required: false
    }
  },
  data() {
    return {
      carouselMenu: {
        t1: '',
        t2: '',
        index: 0
      },
      slides: [],
      lang: cookie({ name: 'site_language' }),
      isShow: true,
      current_desc: '',
      current_index: 0
    }
  },
  computed: {
    // ...mapState(['menuClass']),

    display_count() {
      return this.slides && this.slides.length
    },
    slidesInfo() {
      const data = this.$t('menuClass1.data')
      if (data) {
        return this.updateSlidesInfo('slidesInfo', data)
      } else {
        return null
      }
    }
  },
  watch: {
    $route(to, from) {
      this.updateCookie(to.path)
    },
    s(val) {}
  },
  created() {},
  mounted() {},
  methods: {
    updateCookie(path) {
      const arrRouteParams = path.match(/\b\w+\b/g)
      const classMenu2Key = arrRouteParams[1]

      let k
      const ds = document.getElementsByClassName('slideMenu')
      for (let d = 0, dLen = ds.length; d < dLen; d++) {
        if (ds[d].getAttribute(name) === classMenu2Key) {
          k = ds[d]
          break
        }
      }
      // let k = ds.find(i=>i.$attrs.name===classMenu2_key)
      let _index = 0

      _index = typeof k !== 'undefined' ? k.index : 0
      // update sessionStorage: carouselMenu info
      cookie({
        name: 'carouselMenu',
        info: {
          t1: arrRouteParams[0],
          t2: arrRouteParams[1],
          index: _index
        },
        is_json: true
      })

      this.carouselMenu = cookie({ name: 'carouselMenu' })
    },

    // update slides json data
    updateSlidesInfo(from, data) {
      const path = this.$route.path
      const arrRouteParams = path.match(/\b\w+\b/g)
      const t1 = arrRouteParams[0]
      // let data = this.menuClass1 || null // this.menuClass.menuClass1.info || null

      if (data) {
        const currentData = data.find((i) => i.id === t1)
        let subData = null

        if (currentData) {
          this.slides = currentData.subMenu
          subData = currentData.subMenu
        }
        this.isShow = true

        this.updateCurrentInfo()

        // get cookies info for
        this.updateCookie(path)

        return subData
      } else {
        this.isShow = false
        return null
      }
    },
    updateCurrentInfo(index) {
      const path = this.$route.path
      const arrRouteParams = path.match(/\b\w+\b/g)
      const t2 = arrRouteParams[1]

      // update menu description
      if (index) {
        this.current_index = index // this.slides.find(i=>i.name===t2)
        this.current_desc = this.slides[index]
          ? this.slides[index].desc
          : this.slides[0].desc
      } else {
        this.current_index = this.slides.findIndex((i) => i.name === t2) // this.slides.find(i=>i.name===t2)
        this.current_desc = this.slides[this.current_index]
          ? this.slides[this.current_index].desc
          : this.slides[0].desc
      }
    },
    onLastSlide(index) {
      // ('onLastSlide Callback Triggered', 'Slide Index ' + index)
    },
    onMainSlideClick() {
      // ('onMainSlideClick Callback Triggered')
    },
    onBeforeSlideChange(index) {
      // ('onBeforeSlideChange')
      this.updateCurrentInfo(index)
      // this.current_desc = this.slides[index].desc
    },
    onAfterSlideChange(index) {
      // ('onAfterSlideChange')
      // 切换carousel-slide路由历史更新
      const path = this.slidesInfo[index].path // 当前路由index
      if (path) {
        this.$router.push({ path }) // {path: `/user/${userId}`})
      }
    },
    // 相对路径的图片地址转成流图片
    requireImg(url) {
      if (url) {
        return require(`${url}`)
      } else {
        return require('./images/error.jpg')
      }
    },

    // buffer menuClass1 json data to sessionStorage [menuClass1]
    bufferMenuClass1(_val) {
      const obj = {
        type: 'sessionStorage',
        // eslint-disable-next-line no-undef
        name: MENU_CLASS1,
        info: _val,
        is_json: true
      }
      storage(obj)
    },
    // get buffer menuClass1 json data
    getBufferMenuClass1() {
      return storage({
        type: 'sessionStorage',
        // eslint-disable-next-line no-undef
        name: MENU_CLASS1,
        is_json: true
      })
    },

    parentResetOrder(start) {
      // this.current_index = start
      this.isShow = false

      this.$nextTick(() => {
        this.current_index = start
        this.isShow = true
      })
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.CarouselMenu
  height: auto;
  margin-top: 0.85rem;
  .carousel-3d-container
    height: 100% !importent;

.carousel-3d-slide
  border: none;
  background: none;
  opacity: 0.4!important;

.carousel-3d-slider .current
  border:none;
  opacity: 1!important;

.carousel-3d-slide .slide_title
  display: none;

.carousel-3d-slide.current .slide_title
  color: #000;
  background-color: #f5f5f5;
  font-weight: 600;

  width: 100%;
  /* border: 1px solid red; */
  display: block;
  padding: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 0.4rem;
  font-size: 0.24rem;
  text-align: center;

@media (min-width: 1200px)
  .CarouselMenu
    margin-top: 1.1rem;

    .carousel-3d-container
      margin: 0;
      height: 3rem !important;

      .carousel-3d-slide
        height: 3rem !important;

        .slide_title
          background-color: #f5f5f5 !important
          margin-left: -0.22rem;
          top: 92%;
          font-size: 0.2rem;
          border-radius: 0.05rem;
          padding: 0.015rem;

	  img
     height: 3.5rem;

  .slide_title
    font-size: 0.2rem;

/* Normal desktop :992px. */
@media (min-width: 992px) and (max-width: 1200px)
  .CarouselMenu
    margin-top: 0.4rem;
    .slide_title
      background: none;
      margin-left: -0.22rem;
      top: 88%;
      font-size: 0.2rem;
      border-radius: 0.05rem;
      padding: 0.015rem;

  .slide_title
    font-size: 0.2rem;

/* Tablet desktop :768px. */
@media (min-width: 768px) and (max-width: 991px)
  .CarouselMenu
    margin-top: 0.355rem;

  .slide_title
    font-size: 0.2rem;

/* small mobile :320px. */
@media (max-width: 767px)
  .CarouselMenu
    margin-top: 1rem;

  .slide_title
    font-size: 0.25rem;

  .carousel-3d-container
    margin: 0 auto;
</style>
