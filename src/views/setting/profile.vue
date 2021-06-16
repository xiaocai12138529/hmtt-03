<template>
  <div class="container">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.push('/setting')"
      title="编辑资料"
    >
    </van-nav-bar>

    <!-- 编辑区 -->
    <van-cell-group>
      <van-cell is-link title="头像" center @click="updatePhoto">
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="userInfo.photo"
        />
      </van-cell>
      <!-- value： 设置右侧显示的文字 -->
      <van-cell
        is-link
        title="姓名"
        :value="userInfo.name"
        @click="isShowName = true"
      />
      <!-- 修改名字 -->
      <van-dialog
        @confirm="upUserName()"
        v-model="isShowName"
        title="修改名字"
        show-cancel-button
      >
        <van-field v-model="newName" placeholder="请输入用户名" />
      </van-dialog>
      <!-- 性别 -->
      <van-cell
        is-link
        title="性别"
        :value="userInfo.gender === 1 ? '男' : '女'"
        @click="isShowGender = true"
      />
      <!-- 修改性别 -->
      <van-dialog
        @confirm="upUserGender()"
        v-model="isShowGender"
        title="修改性别"
        show-cancel-button
      >
        <van-radio-group
          v-model="newGender"
          direction="horizontal"
          style="display: flex; justify-content: center"
        >
          <van-radio name="1"
            >男
            <template #icon="">
              <img
                class="img-icon"
                :class="{ max: newGender == 1 }"
                src="@/assets/man.png"
              />
            </template>
          </van-radio>
          <van-radio name="0"
            >女
            <template #icon="">
              <img
                class="img-icon"
                :class="{ max: newGender == 0 }"
                src="@/assets/woman.png"
              />
            </template>
          </van-radio>
        </van-radio-group>
      </van-dialog>

      <van-cell
        is-link
        title="生日"
        :value="userInfo.birthday"
        @click="birthdayClick()"
      />
      <van-action-sheet v-model="isShowBirthday" title="标题">
        <div class="content">
          <!-- 日期组件 -->
          <van-datetime-picker
            @confirm="upBirthday"
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
      </van-action-sheet>
    </van-cell-group>
    <input hidden type="file" ref="upPhoto" @change="hImgUplate" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { setPhoto } from '@/api/user.js'
import birthdayDate from '@/utils/birthdaySplit'
import { formatDate } from '@/utils/birthday.js'
export default {
  name: 'userProfile',
  data () {
    return {
      // 控制弹层
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,

      // 当前用户的信息

      // 修改后的新名字
      newName: '',
      newGender: '1',
      // 修改后新生日
      currentDate: '',
      minDate: new Date(1965, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date() // 当前时间

    }
  },

  created () {
    this.$store.dispatch('user/getProfile')
    this.$store.dispatch('user/updataUserName')
  },
  computed: {
    ...mapState('user', ['userInfo'])

  },
  methods: {
    ...mapActions('user', ['updataUserName']),
    ...mapMutations('user', ['setUserPhoto']),
    upBirthday () {
      this.isShowBirthday = false
      const dat = this.currentDate
      const str = formatDate(dat)
      this.updataUserName({ birthday: str })
    },
    birthdayClick () {
      this.isShowBirthday = true
      const birthday = this.userInfo.birthday
      this.currentDate = birthdayDate(birthday)
    },
    // 修改名字
    upUserName () {
      const newName = this.newName
      if (this.newName === '') {
        return console.log('不能为空')
      } else {
        this.updataUserName({ name: newName })
      }
    },
    // 修改性别
    upUserGender () {
      const newGender = this.newGender
      this.updataUserName({ gender: newGender })
    },
    // 上传头像
    updatePhoto () {
      // eslint-disable-next-line no-unused-expressions
      this.$refs.upPhoto.click()
    },
    // 修改头像
    async hImgUplate (e) {
      // 通过回调获取标签
      const file = e.target.files[0]
      if (!file) {
        return
      }
      // eslint-disable-next-line no-undef
      const fd = new FormData()
      fd.append('photo', file)
      try {
        const res = await setPhoto(fd)
        this.$toast.success('修改头像成功')
        // console.log(res)
        this.setUserPhoto(res.data.data.photo)
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar .van-icon {
  color: #fff;
}
/deep/ .van-radio-group {
  height: 40px;
}
.img-icon {
  width: 20px;
}
.max {
  width: 25px;
}
.content {
  padding: 16px 16px 160px;
}
</style>
