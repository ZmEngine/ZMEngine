///将表单序列换为json对象
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };

    setInterval(GoSelect2, 1000);
})(jQuery);

//监控页面select的变化，配置select2
function GoSelect2() {
    $("select").each(function (i) {
        var sel = $(this);
      
        if (sel.val() == "") {
            return;
        }
        if (sel.attr("isSel") == "ok") {
            return;
        }
        sel.attr("isSel", "ok");
        sel.select2();
    });
}