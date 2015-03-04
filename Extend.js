/*Extend v1.0.1 Power By Ewen Gao 2015-01-20*/

//时间格式化(例如常用格式：yyyy-MM-dd HH:mm:ss),format时间格式字符
Date.prototype.format = function (format) {
    var o =
    {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "H+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
//将json时间格式转换为标准的js时间格式
String.prototype.ToDateTime = function () {
    var date = new Date(parseInt(this.replace("/Date(", "").replace(")/", ""), 10));
    return date;
}
//计算时间差，参数都是布尔类型
//minute计算分钟
//hour计算小时
//day计算天数
Date.prototype.Difference = function (dateTime, minute, hour, day) {
    var diff = this - dateTime;
    minute = minute || false;
    hour = hour || false;
    day = day || false;
    var time = {};
    var minutes, hours;
    if (minute && !hour && !day) {
        time = { minutes: parseInt(diff / 60000), hour: 0, day: 0 };
    }
    if (hour && !minute && !day) {
        time = { minutes: 0, hour: parseInt(diff / 3600000), day: 0 }
    }
    if (day && !minute && !hour) {
        time = { minutes: 0, hour: 0, day: parseInt(diff / 3600000 / 24) }
    }
    if (minute && hour && !day) {
        minutes = diff % 3600000 > 0 ? parseInt((diff % 3600000) / 60000) : 0;
        time = { minutes: minutes, hour: parseInt(diff / 3600000), day: 0 };
    }
    if (minute && hour && day) {
        hours = (diff % 3600000 % 24) > 0 ? parseInt((diff % (3600000 * 24)) / 3600000) : 0;
        minutes = (diff % 3600000) > 0 ? parseInt((diff % 3600000) / 60000) : 0;
        time = { minutes: minutes, hour: hours, day: parseInt(diff / 3600000 / 24) };
    }
    return time;
}
//增加时间
Date.prototype.Sum = function (seconds, minutes, hours, days, month, years) {
    this.setSeconds(this.getSeconds() + (seconds || 0));
    this.setMinutes(this.getMinutes() + (minutes || 0));
    this.setHours(this.getHours() + (hours || 0));
    this.setDate(this.getDate() + (days || 0));
    this.setMonth(this.getMonth() + (month || 0));
    this.setFullYear(this.getFullYear() + (years || 0));
    return this;
}
//判断字符串是否为空或者由空格组成
String.prototype.IsNullOrEmpty = function () {
    return this.replace(/\s/g, "").length === 0;
}
//验证字符串格式是否符合邮箱格式
String.prototype.IsEmail = function () {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    return reg.test(this);
}
//验证字符串格式是否符合以13、14、15、18开头的手机号码格式
String.prototype.IsPhone = function () {
    var reg = /^1[3|4|5|8][0-9]\d{8}$/;
    return reg.test(this);
}
String.prototpe.RemoveHtml=function(){
    var reg=/<[^/]*>/g;
    ret this.replace(reg,"");
}
//监听键盘按键，只能输入数字。由于IE9以下不支持HTMLElement的原因，所以IE9以下的浏览器这里无法正常使用，除IE外，都支持，有待优化
HTMLElement.prototype.KeyIsNumber = function () {
    this.style.imeMode = "disabled";
    this.addEventListener("keydown", function (e) {
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 13) {
            return true;
        }
        e.preventDefault();
        return true;
    }, false);
}
//监听键盘按键，只能输入数字和一位小数点。由于IE9以下不支持HTMLElement的原因，所以IE9以下的浏览器这里无法正常使用，除IE外，都支持，有待优化
HTMLElement.prototype.KeyHasPoint = function () {
    this.style.imeMode = "disabled";
    var el = this;
    this.addEventListener("keydown", function (e) {
        //判断不能在开头输入小数点
        if (el.value == "" && (e.keyCode == 110 || e.keyCode == 190 || e.keyCode == 229)) {
            e.preventDefault();
            return true;
        }
        //判断小数点的数量不超过1个
        if (el.value.indexOf(".") > -1 && (e.keyCode == 110 || e.keyCode == 190)) {
            e.preventDefault();
            return true;
        }
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 190 || e.keyCode == 110 || e.keyCode == 13) {
            return true;
        }
        e.preventDefault();
        return true;
    }, false);
}
//数组正序排序
Array.prototype.OrderBy = function () {
    this.sort(function (a, b) {
        return a - b;
    });
    return this;
}
//数组倒序排序
Array.prototype.OrderByDescing = function () {
    this.sort(function (a, b) {
        return b - a;
    });
    return this;
}
//给指定的对象绑定HTML数据
//o对象id属性值
//key需要绑定数据的key
//tag标签名称
//attr属性值
//fn回调函数
Array.prototype.BindHtml = function (o, key, tag, attr, fn) {
    var tags = [];
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        var obj = ElementById(o);
        var tagObj = document.createElement(tag);
        for (var a in attr) {
            tagObj.setAttribute(a, attr[a]);
        }
        tagObj.innerHTML = item.hasOwnProperty(key) ? item[key] : item;
        tags.push(tagObj);
        obj.appendChild(tagObj);
    }
    if (fn != undefined) {
        fn(tags);
    }
}
//简化查询dom对象的方法
ElementById = function (elementId) {
    return document.getElementById(elementId);
}
