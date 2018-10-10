const main = $("#main");
const manage = {
  init: function() {
    this.formInit();
    this.multipleFunc();
  },
  formInit: () => {
    $("#demo").on("submit", '[data-btn="create"]', function() {
      if (multipleCount && dollar) {
        return true;
      } else {
        return false;
      }
    });
    //倍数
    let multipleCount = null;
    main.on("blur", '[data-name="mul"]', function() {
      let reg = /^[1-9][0-9]*$/;
      let str = $(this).val();
      if (reg.test(str)) {
        multipleCount = true;
        $('[data-name="mulput"]').text("");
      } else if (!str) {
        $('[data-name="mulput"]').text("请填写每单认购倍数");
        multipleCount = false;
      } else {
        $('[data-name="mulput"]').text("输入不正确");
        multipleCount = false;
      }
    });
    //元
    let dollar = null;
    main.on("blur", '[data-name="dollar"]', function() {
      let reg = /^[1-9]*[0,2,4,6,8]$/;
      let str = $(this).val();
      if (reg.test(str)) {
        dollar = true;
        $('[data-name="$"]').html("&nbsp&nbsp&nbsp&nbsp最小复制金额为2元");
      } else if (!str) {
        $('[data-name="$"]').html("&nbsp&nbsp&nbsp&nbsp请填写每单认购金额");
        dollar = false;
      } else {
        $('[data-name="$"]').html("&nbsp&nbsp&nbsp&nbsp输入不正确");
        dollar = false;
      }
    });
  },
  //倍数显示//倍数消失
  multipleFunc: () => {
    $("#customtype").on("click", "label", function() {
      if ($(this).attr("data-name") === "money") {
        main.find('[data-name="everybuy"]').hide();
      } else if ($(this).attr("data-name") === "multiple") {
        main.find('[data-name="everybuy"]').show();
      }
    });
  }
};

$(function() {
  manage.init();
});
