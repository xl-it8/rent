<template>
  <div class="my">
    <div class="login" v-if="user && user.token">
      <img
        class="my_pic"
        src="http://liufusong.top:8080/img/avatar.png"
        alt=""
      />
      <div class="card">
        <div class="avatar">
          <img :src="'http://liufusong.top:8080' + userList.avatar" alt="" />
        </div>
        <p>{{ userList.nickname }}</p>
        <van-button type="primary" @click="signOut">退出</van-button>
        <div>
          <span class="person">编辑个人资料</span>
          <van-icon name="arrow" size="4px" />
        </div>
      </div>
    </div>
    <div class="notlogin" v-else>
      <img
        class="my_pic"
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt=""
      />
      <div class="card">
        <div class="avatar">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <p>游客</p>
        <van-button type="primary" @click="$router.push('/login')"
          >去登陆</van-button
        >
      </div>
    </div>
    <div class="info">
      <van-row>
        <!-- <van-col span="6">span: 6</van-col> -->
        <MyCol
          v-for="(obj, index) in list"
          :key="index"
          :iconName="obj.icon"
          :info="obj.info"
          :color="obj.color"
          @touchstart.native="fn(index)"
          @touchend.native="fun(index)"
          @click.native="change(index)"
        ></MyCol>
      </van-row>
    </div>
    <div class="ad-poster">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>
<script>
import MyCol from '@/components/MyCol.vue'
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  components: { MyCol },
  data() {
    return {
      list: [
        { icon: 'star-o', info: '我的收藏', color: 'none' },
        { icon: 'wap-home-o', info: '我的出租', color: 'none' },
        { icon: 'underway-o', info: '看房记录', color: 'none' },
        { icon: 'idcard', info: '成为房主', color: 'none' },
        { icon: 'contact', info: '个人资料', color: 'none' },
        { icon: 'service-o', info: '联系我们', color: 'none' }
      ],
      userList: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async signOut() {
      await this.$dialog.confirm({ message: '确认要退出?' })
      this.$store.commit('saveUser', {})
    },
    fn(val) {
      const obj = this.list.find((item, index) => index === val)
      this.$set(obj, 'color', '#ccc')
    },
    fun(val) {
      const obj = this.list.find((item, index) => index === val)
      this.$set(obj, 'color', 'white')
    },
    change(index) {
      if (index === 0) {
        this.$router.push('/favorite')
      }
      if (index === 1) {
        this.$router.push('/rent')
      }
    }
  },
  async mounted() {
    try {
      const res = await getUserInfo()
      this.userList = res.data.body
      // console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

}
</script>

<style lang="less" scoped>
.notlogin {
  .my_pic {
    width: 375px;
    height: 197px;
  }
  .card {
    text-align: center;
    position: absolute;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 310px;
    height: 160px;
    box-shadow: 0 0 10px 3px #ddd;
    background-color: white;
    p {
      margin-top: 50px;
      font-size: 13px;
    }
    .avatar {
      position: absolute;
      top: -5%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      overflow: hidden;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .van-button {
      width: 69px;
      height: 30px;
      font-size: 13px;
      padding: 0;
      border-radius: 3px;
    }
  }
}
.info {
  margin-top: 120px;
}
.van-icon {
  font-size: 20px;
}
/deep/ .van-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
  p {
    font-size: 13px;
  }
}
.ad-poster {
  width: 345px;
  height: 85px;
  border-radius: 3px;
  margin: auto;
  img {
    width: 100%;
  }
}

/deep/ .login {
  .my_pic {
    width: 375px;
    height: 197px;
  }
  .card {
    text-align: center;
    position: absolute;
    top: 32%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 310px;
    height: 160px;
    box-shadow: 0 0 10px 3px #ddd;
    background-color: white;
    p {
      margin-top: 50px;
      font-size: 13px;
    }
    .avatar {
      position: absolute;
      top: -5%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 5px solid #f5f5f5;
      overflow: hidden;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .van-button {
      width: 69px;
      height: 30px;
      font-size: 13px;
      padding: 0;
      border-radius: 3px;
    }
  }
  .person {
    font-size: 12px;
    color: #999;
  }
  .van-icon {
    .van-button__text {
      color: #fff !important;
    }
  }
}
</style>
