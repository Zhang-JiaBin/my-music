import CreateAPI from 'vue-create-api'
import Toast from '../common/toast'
import Vue from 'vue'

Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.mixin({
  methods: {
    toast (settings) {
      return this.$createToast({
        $props: settings
      })
    },
    simpleToast (text) {
      const toast = this.toast({
        text: text
      })
      toast.show()
      toast.updateText(text)
    }
  }
})
