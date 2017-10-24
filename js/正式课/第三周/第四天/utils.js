var utils=(function(){
    function getCss(curEle,atr) {
        if(typeof curEle === "undefined" || typeof atr === "undefined"){
            throw new Error("参数不正确");
        }
        var val="";
        if("getComputedStyle" in window){
            val=getComputedStyle(curEle)[atr];
        }else{
            if(atr==="opacity"){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+(?:\.\d))\)$/;
                return reg.test(val)?reg.exec(val)[1]/100:null;
            }else{
                val=curEle.currentStyle[atr];
            }
        }
        return parseFloat(val);
    }

    function setCss(curElr,attr,val) {
        if(attr==="float"){
            curElr.style[attr]=val;
            curElr.style["styleFloat"]=val;
            return;
        }
        if(attr==="opacity"){
            curElr.style[attr]=val;
            curElr.style["fiter"]="alpha(opacity="+val*100+")";
            return;
        }

        var reg=/^(width|height((margin|padding)?(top|bottom|right|left)?)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val=val+"px";
            }
        }
        curElr.style[attr]=val;
    }

    function setGroup(curElr,options) {
        if(typeof options ==="object"){
            for(var key in options){
                setCss(curElr,key,options[key]);
            }
        }
    }

    function css() {
        var len=arguments.length;
        var curEle=arguments[0];
        var attr,val,options;
        if(len==3){
            attr=arguments[1];
            val=arguments[2];
            setCss(curEle,attr,val);
            return;
        }
        if(len==2){
            if(typeof arguments[1]==="object"){
                options=arguments[1];
                setGroup(curEle,options);
                return;
            }
            attr=arguments[1];
            return getCss(curEle,attr);

        }

    }
    function toListArray(num) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(num);

        } catch (e) {
            for (var i = 0; i < num.length; i++) {
                ary[ary.length] = num[i];
            }
        }
        return ary;
    }
    function toJson(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
    function offset(curEle) {
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var p=curEle.offsetParent;
        while (p){
            if(!/MSIE 8\.0/.test(navigator.userAgent)){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        };
        return {
            l:l,
            t:t
        };
    }
    function win(attr,value) {
        if(typeof value==="undefined"){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    return {
        getCss:getCss,
        setCss:setCss,
        setGroup:setGroup,
        css:css,
        toListArray:toListArray,
        toJson:toJson,
        offset:offset,
        win:win
    }
})();

