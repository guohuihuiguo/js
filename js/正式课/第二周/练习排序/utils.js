var utils={
    toListArray:function (cur) {
        var ary=[];
        try{
            ary=Array.prototype.slice.call(cur);
        }catch(e){
            for(var i=0;i<cur.length;i++){
                ary[ary.length]=cur[i];
            }
        }
        return ary;
    },
    toJson:function (str) {
        return "JSON" in window?JSON.parse(str):eval("("+str+")");
    }
}