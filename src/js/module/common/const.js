/**
 * @author rubyisapm
 */
var constConfig = {
    data: {
        reportType: [
            {
                key: 1,
                val: '下载',
                color: 'text-danger'
            }, {
                key: 2,
                val: '安装',
                color: 'text-success'
            }
        ],
        types(){
            var that = constConfig;

            $.ajax({
                url: '/api/constlis1',
                cache: false,
                async: false
            }).done(res=> {
                if (res.Status) {
                    that.data.types.data = [];
                    res.Data.map(item=> {
                        that.data.types.data.push({
                            key: item.Id,
                            val: item.Val
                        });
                    });
                } else {
                    //warning!请给出默认值
                    that.data.types.data = [];
                }
            }).fail(()=> {
                //warning!请给出默认值
                that.data.types.data = [];
            });
        }
    },
    getter: {
        getData(col){
            var data;
            var that = constConfig;

            if (Array.isArray(that.data[col])) {
                data = that.data[col];
            } else if (Array.isArray(that.data[col].data) && that.data[col].data.length > 0) {
                data = that.data[col].data;
            } else {
                that.data[col]();
                data = that.data[col].data;
            }
            return data;
        },
        getValByKey(col, key){
            var data = constConfig.getter.getData(col);
            var matchedItem;

            matchedItem = data.filter((item)=> {
                return item.key === key;
            });
            return matchedItem[0].val;
        },
        getKeyByVal(col, val){
            var data = constConfig.getter.getData(col);
            var matchedItem = data.filter((item)=> {
                return item.val === val;
            });

            return matchedItem[0].key;
        },
        getListConfig(col){
            var data = constConfig.getter.getData(col);
            var config = {};

            data.map((item)=> {
                config[item.key] = {
                    text: item.val
                };
                if (typeof item.color !== 'undefined') {
                    config[item.key].className = item.color;
                }
            });
            return config;
        }
    }
};

export default constConfig;
