<template>

  <div>
    <!--<img v-for="item in fileList" :src="item" alt="">-->
    <!--<form id="sub" action="" method="get"></form>-->
    <div id="circle_loading"
         style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0,0,0,0.5);z-index: 1000;display: none;text-align: center;">
      <i class="el-icon-loading" style="font-size: 30px;color: #fff;font-weight: 900;margin-top: 25%"></i>
    </div>

  </div>

</template>

<script>

  import html2canvas from 'html2canvas'

  export default {
    name: "z-c-screen-shot",
    props: {
      data: {type: HTMLCollection / Array, require: false},
      options: {type: Object, require: false}
    },

    data() {
      return {
        fileList: [],
        actionString: '',
        showLoading:false
      }
    },
    watch: {

      options(val){

        if(this.data.length && val){
          document.getElementById('circle_loading').style.display = 'block';
          this.beginToScreenShot(this.data);
        }
      }
    },
    methods: {

      beginToScreenShot(data) {

        let thiz = this;
        for (let i = 0; i < data.length; i++) {
          let el = data[i];

          this.screenShotMethod(el, function (dataUrl, imgWidth, imgHeight) {

            let imgStr = dataUrl.split(','), img = imgStr[1],obj = {img: img, width: imgWidth, height: imgHeight,name:el.id};

            thiz.fileList.push(JSON.stringify(obj));
            if (thiz.fileList.length === thiz.data.length) {
              /*启动上传机制*/
              thiz.uploadPic();
            }
          })
        }

      },

      uploadPic() {


        // let formData = {};
        let formData = new FormData();

        formData.append("fileList", this.fileList);
        // formData.fileList = this.fileList;

        formData.append('accountType', this.options.accountType);
        // formData.accountType = this.options.accountType;

        formData.append('startTime', this.options.startTime);
        // formData.startTime = this.options.startTime;

        let sidebarType = this.options.sidebarType;

        if (sidebarType === 1002) {
          // 1002表示查具体ID
          formData.append('platformId', this.options.plantformId);
          // formData.platformId = this.options.plantformId;

        } else if (sidebarType === 1001) {
          formData.append('platformTypeId', this.options.plantformId);
          // formData.platformTypeId = this.options.plantformId;

        } else if (sidebarType === 1003) {
          formData.append('groupId', this.options.plantformId);
          // formData.groupId = this.options.plantformId;
        }


        this.$http.post(this.baseUrl+'/spread/downLoadWord', formData).then(function (res) {
        // this.$http.post('http://10.6.5.52:9092/imonitor/v1'+'/spread/downLoadWord', formData).then(function (res) {

          let response = JSON.parse(res.bodyText);
          document.getElementById('circle_loading').style.display = 'none';

          if (response.code == 200 && response.data) {
            this.downloadWord(response.data);
            this.fileList = [];
          }else{
            this.alert('生成失败,请重试')
          }


        }, function (err) {
          console.log(err);
        });
        // this.downloadWord('https://codeload.github.com/douban/douban-client/legacy.zip/master')
      },

      downloadWord(url) {

        // let sub = document.getElementById('sub');
        // sub.setAttribute('action', url);
        // sub.submit();
        // window.open(url)
        window.location.href = url;
        // debugger;
        // window.open('http://www.baidu.com');

      },

      screenShotMethod(el, callBack) {
        let thiz = this, imgWidth = el.offsetWidth, imgHeight = el.offsetHeight;
        html2canvas(el, {scale: 1, logging: false}).then(canvas => {
          let dataUrl = canvas.toDataURL();
          callBack(dataUrl, imgWidth, imgHeight);
        });
      },

      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      }

    }
  }
</script>

<style scoped>


</style>
