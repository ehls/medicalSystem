<template>
  <div class="detail">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1692687250329"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1598"
          width="16"
          height="16"
        >
          <path
            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
            p-id="1599"
          ></path>
        </svg>
        <span>{{
          hospitalStore.hospitalInfo.hospital?.param.hostypeString
        }}</span>
      </div>
    </div>
    <div class="logo">
      <div class="left">
        <img
          :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
          alt=""
        />
      </div>
      <div class="right">
        <div class="icon">
          <svg
            t="1692866864071"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4026"
            width="16"
            height="16"
          >
            <path
              d="M512 512m-80 0a80 80 0 1 0 160 0 80 80 0 1 0-160 0Z"
              p-id="4027"
              fill="#7f7f7f"
            ></path>
            <path
              d="M960 480h-33.632C910.752 276.16 747.84 113.248 544 97.632V64a32 32 0 1 0-64 0v33.632C276.16 113.248 113.248 276.16 97.632 480H64a32 32 0 0 0 0 64h33.632C113.248 747.84 276.16 910.752 480 926.368V960a32 32 0 1 0 64 0v-33.632C747.84 910.752 910.752 747.84 926.368 544H960a32 32 0 1 0 0-64zM544 862.368V800a32 32 0 1 0-64 0v62.368C311.424 847.104 176.896 712.576 161.632 544H224a32 32 0 1 0 0-64H161.632C176.896 311.424 311.424 176.896 480 161.632V224a32 32 0 0 0 64 0V161.632c168.576 15.296 303.104 149.792 318.368 318.368H800a32 32 0 1 0 0 64h62.368c-15.264 168.576-149.792 303.104-318.368 318.368z"
              p-id="4028"
              fill="#7f7f7f"
            ></path>
          </svg>
        </div>
        <div class="address">
          <div>
            具体地址:
            {{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
          </div>
          <div>规划路线: {{ hospitalStore.hospitalInfo.hospital?.route }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
        <div class="title">医院介绍</div>
        <div class="intro">
            {{ hospitalStore.hospitalInfo.hospital?.intro }}
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHospitalStore } from "@/store/hospital";

let hospitalStore = useHospitalStore();
</script>
<style scoped lang="less">
.detail {
  .top {
    display: flex;
    margin-left: 20px;
    margin-top: 50px;
    .title {
      font-size: 20px;
    }
    .level {
      color: #7f7f7f;
      margin-left: 10px;
      display: flex;
      align-items: center;
      span {
        margin-left: 4px;
      }
    }
  }
  .logo {
    display: flex;
    .left {
      width: 80px;
      padding: 20px;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      margin-top: 20px;
      color: #7f7f7f;
      display: flex;
      .icon {
        width: 16px;
        padding-right: 10px;
      }
      .address {
        line-height: 16px;
        div{
            margin-bottom: 10px;
        }
      }
    }
  }

  .footer{
    margin-left: 50px;
    .intro{
        margin-top: 10px;
        color: #7f7f7f;
    }
  }
}
</style>
