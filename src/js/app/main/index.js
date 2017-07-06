import '../../../css/common';
import 'common/const';
import 'common/interface';
$.ajax({
    url: '/api/patch/gettestchannelId',
    type: 'get',
    success: function(res) {
        console.log(res);
    }
});
