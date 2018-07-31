


$.fn.workflowdocument = function (options) {
    _PORTALROOT_GLOBAL = options.PortalRoot == "" ? "/Portal" : options.PortalRoot;
    InstanceID = options.InstanceID;
    WorkflowCode = options.WorkflowCode;
    WorkflowVersion = options.WorkflowVersion == "" ? -1 : options.WorkflowVersion;
    if (InstanceID == undefined && WorkflowCode == undefined && WorkflowVersion == undefined) {
        return;
    }
    workflowdocument();
}

var workflow;
var svg;
var body;
var layout;
var wp;
var thumbnail_container;
var thumbnail_workspace;
//IE8和IE9不支持console
var console = window.console || { log: function (t) { } };
var WorkflowCode = "";//流程编码
var WorkflowVersion = -1;//流程版本
var InstanceID = "";//流程实例ID

var InstanceContext = null;
var workflowMode = null;
var ActivityDockCalculaterWorker;
var _PORTALROOT_GLOBAL = "";
var workflowdocument = function () {
    var random = new Date().getTime();
    //加载可选的活动模板
    $.ajax({
        url: _PORTALROOT_GLOBAL + "/WorkflowDesigner/SetActivityTemplates",
        type: 'post',
        dataType: "json",
        data: {
            random: random
        },
        async: false,//同步执行
        success: function (data) {
            ActivityTemplateConfigs = data;
        }
    });
    //加载脚本
    var WorkflowScripts = [];
    //活动节点参数
    $.ajax({
        url: _PORTALROOT_GLOBAL + "/WorkflowDesigner/RegisterActivityTemplateConfigs",
        type: 'post',
        dataType: "json",
        data: {
            WorkflowCode: WorkflowCode,
            WorkflowVersion: WorkflowVersion == null ? -1 : WorkflowVersion,
            InstanceID: InstanceID,
            random: random
        },
        async: false,//同步执行
        success: function (data) {
            workflowMode = 3;
            WorkflowTemplate = data.WorkflowTemplate;//流程模板
            InstanceContext = data.InstanceContext;
            ExceptionActivities = data.ExceptionActivities;//异常加点
        }
    });

    //脚本加载完成后事件
    var loadFinished = function () {
        body = $("body:first");
        //流程模板对象
        workflow = new Workflow("div.workspace");

        ////线条画布对象
        //svg = $("svg:first");
        //如果支持SVG
        //ERROR:For Debug
        if (document.implementation.hasFeature("org.w3c.svg", "1.0")) {
            //使用Svg
            workflow.UtilizeSvg = true;
            svg = $(document.createElementNS("http://www.w3.org/2000/svg", "svg"))
                .addClass("workspace_svg")
                .attr("version", "1.1");
            svg.css("width", "100%").css("height", "100%");
        }
        else {
            //不使用Svg
            workflow.UtilizeSvg = false;
            //使用DIV画线
            svg = $("<div></div>").addClass("workspace_svg");
        }
        $(workflow.workspace).children(":first").before(svg);

        if (workflowMode == WorkflowMode.Designer || workflowMode == WorkflowMode.ViewWithProperty) {
            layout = $("#divDesigner").ligerLayout({ isRightCollapse: true, rightWidth: 380 });
            wp = new WorkflowProperty(layout, WorkflowDocument);
        }

        ActivityModelInit();

        //宽和高
        $(workflow.workspace).width(WorkflowSettings.MinInnerWidth);
        $(workflow.workspace).height(WorkflowSettings.MinInnerHeight);

        //在流程图中添加点击时自动生成活动和线条的箭头
        if ($(workflow.workspace).find("." + WorkflowStyleClassName.WorkflowAotuArrow).length == 0) {
            var arrow = $("<div class='" + WorkflowStyleClassName.WorkflowAotuArrow + "'></div>");
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowLeft).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowUp).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowRight).appendTo(workflow.workspace);
            arrow.clone().addClass(WorkflowStyleClassName.WorkflowAotuArrowDown).appendTo(workflow.workspace);
        }

        //在流程图中添加活动移动时对齐的线
        if ($(workflow.workspace).find("." + WorkflowStyleClassName.ActivityDockLine).length == 0) {
            //<div class="dock_line dock_line_horizontal dock_line_top"></div>
            var dockLine = $("<div class='" + WorkflowStyleClassName.ActivityDockLine + "' ></div>");
            var dockLine_horizontal = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineHorizontal);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineTop).appendTo(workflow.workspace);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineMiddle).appendTo(workflow.workspace);
            dockLine_horizontal.clone().addClass(WorkflowStyleClassName.ActivityDockLineBottom).appendTo(workflow.workspace);

            var dockLine_vertical = dockLine.clone().addClass(WorkflowStyleClassName.ActivityDockLineVertical);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineOffsetLeft).appendTo(workflow.workspace);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineCenter).appendTo(workflow.workspace);
            dockLine_vertical.clone().addClass(WorkflowStyleClassName.ActivityDockLineRight).appendTo(workflow.workspace);
        }
        //debugger;
        if (typeof (WorkflowTemplate) != "undefined" && WorkflowTemplate) {
            WorkflowDocument.LoadWorkflow(WorkflowTemplate, true);
        }
        else if ($.fn.getUrlParam("WorkflowCode")) {
            WorkflowDocument.InitWorkflow(decodeURI($.fn.getUrlParam("WorkflowCode")));
        }

        if (workflowMode == WorkflowMode.Designer || workflowMode == WorkflowMode.ViewWithProperty) {
            //显示流程标题
            WorkflowDocument.DisplayWorkflowFullName();
        }

        var outerContainerSize = {
            width: $(workflow.outerContainer).css("width"),
            height: $(workflow.outerContainer).css("height")
        }

        //开发人员预留接口,在流程加载完成后执行
        if (typeof (LoadWorflowFinished) == "function") {
            LoadWorflowFinished();
        }

        if (workflowMode == WorkflowMode.Designer) {
            thumbnail_container = $(".div-thumbnail");
        }
        var _MonitorWorkflowSize = function () {
            //活动拖动\调整大小时不处理
            if (!ActivityDragStack.IsDragging && !ActivityResizeStack.Resizing
                && (!WorkflowEventStack.CurrentMultiAction || WorkflowEventStack.CurrentMultiAction == WorkflowMultiActionType.None)
                && $(workflow.workspace).is(":visible")) {
                if (outerContainerSize.width != $(workflow.outerContainer).css("width") || outerContainerSize.height != $(workflow.outerContainer).css("height")) {
                    outerContainerSize.width = $(workflow.outerContainer).css("width");
                    outerContainerSize.height = $(workflow.outerContainer).css("height");
                    workflow.autoFit();
                    //更新缩略图
                    if (typeof (TraceManager) != "undefined" && TraceManager.UpdateThumbnail)
                        TraceManager.UpdateThumbnail();
                }
            }
            setTimeout(_MonitorWorkflowSize, 200);
        }

        //监控流程设计区域大小变化
        setTimeout(_MonitorWorkflowSize, 200);
    }
    var scriptIndex = 0;
    var loadJs = function () {
        if (scriptIndex < WorkflowScripts.length)
            $.ajax({
                url: _PORTALROOT_GLOBAL + "/WFRes/_Scripts/designer/" + WorkflowScripts[scriptIndex],
                cache: true,
                dataType: "script",
                success: function (a, b, c) {
                    scriptIndex++;
                    loadJs();
                },
                error: function (a, b, c) {
                }
                //success: loadJs
            });
        else {
            loadFinished();
        }
    }
    _WorkflowDesigner_GlobalString = $.Lang("Designer");
    loadJs();
}
