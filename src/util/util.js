import moment from "moment/moment";
/**
* 获取url后面的参数
*/
export const parseQuery = function (url) {
    var queryObj={};
    var reg=/[?&]([^=&#]+)=([^&#]*)/g;
    var querys=url.match(reg);
    if(querys){
        for(var i in querys){
            var query=querys[i].split('=');
            var key=query[0].substr(1),
                value=query[1];
            queryObj[key]?queryObj[key]=[].concat(queryObj[key],value):queryObj[key]=value;
        }
    }
    return queryObj;
}
/**
 * 压缩图片
 */
export const compressImage = (file, success, error) => {
    // 图片小于1M不压缩
    // console.log("------压缩-------")
    // console.log(file.size)
    // console.log(Math.pow(1024, 2))
    if (file.size < Math.pow(1024, 2)) {
        success(file);
        return
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const src = e.target.result;

        const img = new Image();
        img.src = src;
        img.onload = (e) => {
            const w = img.width;
            const h = img.height;
            const quality = 0.9;  // 默认图片质量为0.92
            //生成canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute("width");
            anw.nodeValue = w;
            const anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);

            //铺底色 PNG转JPEG时透明区域会变黑色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);

            ctx.drawImage(img, 0, 0, w, h);
            // quality值越小，所绘制出的图像越模糊
            // 图片格式jpeg或webp可以选0-1质量区间
            let base64 = canvas.toDataURL('image/jpeg', quality);

            // 返回base64转blob的值
            // console.log(`原图${(src.length / 1024).toFixed(2)}kb`);
            // console.log(`新图${(base64.length / 1024).toFixed(2)}kb`);
            //去掉url的头，并转换为byte
            const bytes = window.atob(base64.split(',')[1]);
            //处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            (function f(quality) {
                // console.log('压缩图片')
                // console.log(base64.length / 1024 / 1024)
                if (base64.length / 1024  > 500) {//大于500K
                    // console.log(base64.length)
                    // console.log(quality)

                    base64 = canvas.toDataURL('image/jpeg', quality);
                    quality = quality - 0.1;
                    f(quality);
                } else {
                    let arr = base64.split(',')
                    let mime = arr[0].match(/:(.*?);/)[1]
                    let bstr = atob(arr[1])
                    let n = bstr.length
                    let u8arr = new Uint8Array(n)

                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }

                    success(new File([u8arr], '反馈图片' + moment().valueOf() + ".jpeg", {type: mime}));
                }
            })(quality);
        }

        img.onerror = (e) => {
            error(e);
        }
    }
    reader.onerror = (e) => {
        error(e);
    }
}
/**
 * @Description: 校验配速
 * @augments: distance:距离,time:时间
 * @author YanMing Liu
 * @date 2019/4/4
*/
export const checkSpeed = (distance,time) => {
    let timeArr = time.split('.');
    const [minutes,seconds] = timeArr;
    if(distance.length > 0 && minutes.length > 0 && seconds.length > 0) {
        let speed = parseFloat(minutes) + parseFloat(seconds) / 60.0;
        speed = speed / parseFloat(distance);
        let speed_minutes = Math.floor(speed);
        let speed_seconds = Math.floor((speed - speed_minutes) * 60.0);
        return `${speed_minutes}.${speed_seconds}`;
    }
    return;
}