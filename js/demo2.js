const demp = $("#office");
const manage = {
  lis: "",
  inputVal: "",
  init: function() {
    this.dialogInit();
    this.clientBtn();
    this.addFunc();
    this.chooseFunc();
    this.blurFunc();
    this.editFunc();
    this.delBtn();
    //this.delFunc();
  },
  dialogInit: () => {
    $("#dialogDom").dialog({
      title: "",
      width: 600,
      height: 300,
      closed: true,
      cache: false,
      modal: true,
      buttons: [
        {
          text: "完成",
          handler: function() {
            event.stopPropagation();
            manage.inputVal = $("[data-btn='before']").val();
            //  debugger;
            $("[data-btn='before']").hide();
            $("[data-btn='before']")
              .closest("li")
              .append('<span data-items="span">' + manage.inputVal + "</span>");
            $("#myItem [data-btn='before']").removeAttr("data-btn");
            manage.chooseFunc();
          }
        },
        {
          text: "取消",
          handler: function() {
            $("#dialogDom").dialog("close");
          }
        }
      ]
    });
  },
  clientBtn: () => {
    $('#team [data-items="btn"]').on("click", function() {
      $("#dialogDom").dialog("open");
    });
  },
  addFunc: () => {
    $('[data-btn="add"]').on("click", function() {
      event.stopPropagation();
      let num = Math.floor(Math.random() * 100) + 1;
      // $("#inputs").val("未命名" + num);
      //判断一下假如ul里面有before的 属性就禁止添加，否则可以继续添加
      if (
        $("ul input").attr("data-btn") === "before" ||
        $("ul li").length > 4
      ) {
        //  debugger;
        alert("最多五条数据");
        //$.messager.alert("提示", "最多五条数据");
      } else {
        $("#myItem").append(
          $("<li/>", {
            html:
              '<input type="text" id="inputs" data-btn="before" value="未命名' +
              num +
              '">'
          })
        );
      }

      $("#dialogDom").dialog("open");

      //debugger;
    });
  },
  //input失去焦点事件
  blurFunc: () => {
    $("ul")
      .find('[data-btn="before"]')
      .parent()
      .click(function(event) {
        event.stopPropagation();
      });
    $(document).click(function() {
      $("ul [data-btn='before']")
        .parent()
        .remove();
    });
  },

  //选择按钮
  chooseFunc: () => {
    // debugger;
    $("#myItem li").on("click", function() {
      manage.lis = $(this).closest("li");
      if (
        $(this)
          .find("button")
          .attr("data-btn") === "edit"
      ) {
        return;
      } else {
        $(this).append('<button data-btn="edit">编辑</button>');
        $(this).append('<button data-btn="del">删除</button>');
        manage.editFunc();
      }
    });
    //debugger;
    //

    $("#myItem li").click(function(event) {
      event.stopPropagation();
    });
  },
  //全局--删除按钮
  delBtn: () => {
    $(document).click(function() {
      $('[data-btn="edit"]').remove();
      $('[data-btn="del"]').remove();
    });
  },
  //  编辑
  editFunc: () => {
    // debugger;
    $("[data-btn='edit']").on("click", function() {
      //  alert("asdfas");
      $(manage.lis)
        .find("span")
        .hide();
      $(manage.lis)
        .find("input")
        .show();
      $("[data-btn='edit']").click(function() {
        $(manage.lis)
          .find("input")
          .hide();
        $(manage.lis)
          .find("span")
          .show()
          .text(
            $(manage.lis)
              .find("input")
              .val()
          );
        $('[data-btn="edit"]').remove();
        $('[data-btn="del"]').remove();
      });
      //  $("#inputs").val($('[data-name="val"]').val()); //点击后input值为span 值
    });
    $(document).click(function() {
      $(manage.lis)
        .find("input")
        .hide();
      $(manage.lis)
        .find("span")
        .show()
        .text(
          $(manage.lis)
            .find("input")
            .val()
        );
    });
  }
  // //删除
  // delFunc: () => {
  //   manage.lis.remove();
};

$(function() {
  manage.init();
});
