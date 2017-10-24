var utils = {
    toListArray: function toListArray(num) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(num);

        } catch (e) {
            for (var i = 0; i < num.length; i++) {
                ary[ary.length] = num[i];
            }
        }
        return ary;
    },
    toJson: function toJson(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};


// var untils=(function () {
//     function toListArray() {
//         var ary=[];
//         try{
//             ary=Array.prototype.slice.call(arguments);
//
//         }catch(e){
//             for(var i=0;i<arguments.length;i++){
//                 ary[ary.length]=arguments[i];
//             }
//         }
//         return ary;
//     }
//
//     function toJson(str) {
//         return "JSON" in window?JSON.parse(str):eval("("+str+")");
//     }
//     return {
//         toListArray:toListArray,
//         toJson:toJson
//     };
// })();