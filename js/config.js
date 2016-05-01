var Poll=function(opts) {
    return new Poll.prototype.init(opts);
};
Poll.prototype = {
    init: function(opts) {
        this.opts=opts;
        this.setOpts();
        this.renderPoll();
        this.bindEvent();
        return this;
    },
    default: {
        data:[],
        context:'.main .form',
        frozen:true,
        sortable:true
    },
    title:{
        "cb": "&nbsp;",
        "title": "标题",
        "time": "时间",
        "status": "状态",
        "btns": "操作"
    },
    setOpts: function(){
        var opts=this.opts,len=Object.keys(this.default).length;
        if(typeof opts!='object'||opts==null){
            this.opts=this.default;
        }
        else{
            for(var item in this.default){
                this.opts[item]=opts[item]||this.default[item];
            }
        }
        this.opts['sortArrow']=this.opts.sortable? 'fa fa-sort-desc arrow down':'fa fa-sort-desc arrow down hide';
    },
    renderPoll:function(){
        var title=this.title,table='',thead='',tbody='',tfoot='',oprts={'编辑':'edit','删除':'delete','查看数据':'detail'};
        for(var item in title){
            switch(item){
                case 'time':
                    thead+='<th>'+title[item]+'<i class="'+this.opts['sortArrow']+'" aria-hidden="true"></i></th>';
                    break;
                case 'btns':
                    thead+='<th>'+title[item]
                        +'<i class="fa fa-plus addNew" aria-hidden="true"></i>'
                        +'<input type="button" value="新建问卷">'
                        +'</th>';
                    break;
                default:
                    thead+='<th>'+title[item]+'</th>';
            }
        }
        this.opts.data.forEach(function(e,i){
            tbody+='<tr id="'+i+'">';
            for(var item in title){
                switch(item){
                    case 'cb':
                        tbody+='<td class="select-checkbox"></td>';
                        break;
                    case 'btns':
                        tbody+='<td>';
                        (e[item]||[]).forEach(function(text){
                            tbody+='<input type="button" class="'+oprts[text]+'" value="'+text+'">';
                        });
                        tbody+='</td>';
                        break;
                    default:
                        tbody+='<td>'+(e[item]||'')+'</td>';
                }
            }
            tbody+='</tr>';
        });
        tfoot='<tr><td class="select-checkbox"></td><td colspan="4"><span>全选</span><input type="button" id="deleteAll" value="删除"></td></td></tr>';
        table='<table><thead><tr>'+thead+'</tr></thead><tbody>'+tbody+'</tbody><tfoot>'+tfoot+'</tfoot></table>';
        $(this.opts.context).innerHTML=table;
    },
    frozen:function(){
        var table=$('table'),thead=$('thead'),ths=$$('thead tr th'),len=ths.length,
            offsetTop=getOffset(table).top,
            tbHeight=(table.currentStyle? table.currentStyle : window.getComputedStyle(table, null)).height;
        if(offsetTop<=getScroll('Top', document)) {
            thead.style.position = 'fixed';
            thead.style.top = 0;
            for(var i=0;i<len;i++) ths[i].style.width=$('tbody tr td:nth-child('+(i+1)+')').offsetWidth+'px';
            if (offsetTop + parseInt(tbHeight) <= getScroll('Top', document)) thead.style.position = 'absolute';
        }else thead.style.position='static';
    },
    sort:function(opts){
        var classList=$('i.arrow').className.split(/\s+/g);
        if(classList.indexOf('down')!=-1){
            opts.data.sort(function(a,b){
                return new Date(b.time)-new Date(a.time);
            });
            opts['sortArrow']='fa fa-sort-asc arrow up';
        }else if(classList.indexOf('up')!=-1){
            opts.data.sort(function(a,b){
                return new Date(a.time)-new Date(b.time);
            });
            opts['sortArrow']='fa fa-sort-desc arrow down';
        }
        this.renderTable();
        this.bindEvent();
    },
    bindEvent:function(){
        var self=this;
        addEvent($('i.arrow'),'click',function(){self.sort(self.opts);});
        addEvent($('tbody'),'click',function(e){
            var e=e||window.event,target= e.target|| e.srcElement,item;
            if(target.className=='delete'){
                item=target.parentNode.parentNode.id;
                $('.modal').style.display="block";
                $('.modal-content').style.display="block";
            }
            addEvent($('.ok'),'click',function(e){
                self.opts.data.splice(item,1);
                self.renderTable();
                self.bindEvent();
            });
        });
        if(this.opts.frozen) addEvent(document,'scroll',self.frozen);
    }
};
Poll.prototype.init.prototype = Poll.prototype;

var Table=function(opts) {
    return new Table.prototype.init(opts);
};
Table.prototype = {
    init: function(opts) {
        this.opts=opts;
        this.setOpts();
        this.renderTable();
        this.bindEvent();
        return this;
    },
    default: {
        data:[],
        context:'.main .form',
        frozen:true,
        sortable:true
    },
    title:{
        "cb": "&nbsp;",
        "title": "标题",
        "time": "时间",
        "status": "状态",
        "btns": "操作"
    },
    setOpts: function(){
        var opts=this.opts,len=Object.keys(this.default).length;
        if(typeof opts!='object'||opts==null){
            this.opts=this.default;
        }
        else{
            for(var item in this.default){
                this.opts[item]=opts[item]||this.default[item];
            }
        }
        this.opts['sortArrow']=this.opts.sortable? 'fa fa-sort-desc arrow down':'fa fa-sort-desc arrow down hide';
    },
    renderTable:function(){
        var title=this.title,table='',thead='',tbody='',tfoot='',oprts={'编辑':'edit','删除':'delete','查看数据':'detail'};
        for(var item in title){
            switch(item){
                case 'time':
                    thead+='<th>'+title[item]+'<i class="'+this.opts['sortArrow']+'" aria-hidden="true"></i></th>';
                    break;
                case 'btns':
                    thead+='<th>'+title[item]
                            +'<i class="fa fa-plus addNew" aria-hidden="true"></i>'
                            +'<input type="button" id="addPoll" value="新建问卷">'
                            +'</th>';
                    break;
                default:
                    thead+='<th>'+title[item]+'</th>';
            }
        }
        this.opts.data.forEach(function(e,i){
            tbody+='<tr id="'+i+'">';
            for(var item in title){
                switch(item){
                    case 'cb':
                        tbody+='<td class="select-checkbox"></td>';
                        break;
                    case 'btns':
                        tbody+='<td>';
                        (e[item]||[]).forEach(function(text){
                            tbody+='<input type="button" class="'+oprts[text]+'" value="'+text+'">';
                        });
                        tbody+='</td>';
                        break;
                    default:
                        tbody+='<td>'+(e[item]||'')+'</td>';
                }
            }
            tbody+='</tr>';
        });
        tfoot='<tr><td class="select-checkbox"></td><td colspan="4"><span>全选</span><input type="button" id="deleteAll" value="删除"></td></td></tr>';
        table='<table><thead><tr>'+thead+'</tr></thead><tbody>'+tbody+'</tbody><tfoot>'+tfoot+'</tfoot></table>';
        $(this.opts.context).innerHTML=table;
    },
    frozen:function(){
        var table=$('table'),thead=$('thead'),ths=$$('thead tr th'),len=ths.length,
            offsetTop=getOffset(table).top,
            tbHeight=(table.currentStyle? table.currentStyle : window.getComputedStyle(table, null)).height;
        if(offsetTop<=getScroll('Top', document)) {
            thead.style.position = 'fixed';
            thead.style.top = 0;
            for(var i=0;i<len;i++) ths[i].style.width=$('tbody tr td:nth-child('+(i+1)+')').offsetWidth+'px';
            if (offsetTop + parseInt(tbHeight) <= getScroll('Top', document)) thead.style.position = 'absolute';
        }else thead.style.position='static';
    },
    sort:function(opts){
        var classList=$('i.arrow').className.split(/\s+/g);
        if(classList.indexOf('down')!=-1){
            opts.data.sort(function(a,b){
                return new Date(b.time)-new Date(a.time);
            });
            opts['sortArrow']='fa fa-sort-asc arrow up';
        }else if(classList.indexOf('up')!=-1){
            opts.data.sort(function(a,b){
                return new Date(a.time)-new Date(b.time);
            });
            opts['sortArrow']='fa fa-sort-desc arrow down';
        }
        this.renderTable();
        this.bindEvent();
    },
    bindEvent:function(){
        var self=this;
        addEvent($('i.arrow'),'click',function(){self.sort(self.opts);});
        addEvent($('tbody'),'click',function(e){
            var e=e||window.event,target= e.target|| e.srcElement,item;
            if(target.className=='delete'){
                item=target.parentNode.parentNode.id;
                $('.modal').style.display="block";
                $('.modal-content').style.display="block";
            }
            addEvent($('.ok'),'click',function(e){
                self.opts.data.splice(item,1);
                self.renderTable();
                self.bindEvent();
            });
        });
        if(this.opts.frozen) addEvent(document,'scroll',self.frozen);
    }
};
Table.prototype.init.prototype = Table.prototype;

var Dialog=function(opts){
    return new Dialog.prototype.init(opts);
};
Dialog.prototype={
    init: function(opts) {
        this.opts=opts;
        this.setOpts();
        this.dialogInitial();
        return this;
    },
    default: {
        type:'prompt',
        title:"提示",
        btns: ["确定", "取消"],
        context:'body',
        modal:true,
        draggable:true
    },
    setOpts: function(){
        var opts=this.opts,len=Object.keys(this.default).length;
        if(typeof opts!='object'||opts==null){
            this.opts=this.default;
        }
        else{
            for(var item in this.default){
                this.opts[item]=opts[item]||this.default[item];
            }
        }
    },
    dialogInitial:function(dragElement,moveElement){
        var modal=$('.modal'),
            modalContent=$('.modal-content'),
            modalHeader=$(".modal-header"),
            okBtn=$('.ok'),
            cancelBtn=$('.cancel'),
            close=$('.close');

        addEvent(close,'click', function(){
            modal.style.display="none";
            modalContent.style.display="none";
        });
        addEvent(okBtn, 'click', function(){
            modal.style.display="none";
            modalContent.style.display="none";
        });
        addEvent(cancelBtn, 'click', function(){
            modal.style.display="none";
            modalContent.style.display="none";
        });
        addEvent(window, 'click', function(e){
            var e=e||window.event;
            var target= e.target|| e.srcElement;
            if(target==modal){
                modal.style.display="none";
                modalContent.style.display="none";
            }
        });
        if(this.opts.draggable) this.drag(modalHeader,modalContent);
    },
    drag:function(dragE,moveE){
        var dialogObj, onMoveStartId, mousePos={x:0,y:0};
        var obj={};
        obj.dragElement=dragE;
        obj.moveELement=moveE;

        obj.mouseOffsetLeft=0;
        obj.mouseOffsetTop=0;
        addEvent(document,'mouseup',function(e){
            dialogObj=false;
            clearInterval(onMoveStartId);
        });
        addEvent(document,'mousemove',function(e){
            var e=e||window.event;
            mousePos.x= e.clientX;
            mousePos.y= e.clientY;

            e.stopPropagation&& e.stopPropagation();
            e.cancelBubble=true;
            e=this.originalEvent;
            e&&(e.preventDefault? e.preventDefault(): e.returnValue=false);
            document.body.style.MozUserSelect='none';
        });
        addEvent(obj.dragElement,'mousedown',function(e){
            var e=e||window.event;
            dialogObj=obj;
            obj.mouseOffsetLeft= e.pageX-obj.moveELement.offsetLeft;
            obj.mouseOffsetTop= e.pageY-obj.moveELement.offsetTop;

            onMoveStartId=setInterval(function(){
                var obj=dialogObj;
                if(obj){
                    var maxX=document.documentElement.clientWidth-obj.moveELement.offsetWidth;
                    var maxY=document.documentElement.clientHeight-obj.moveELement.offsetHeight;

                    obj.moveELement.style.left=Math.min(Math.max((mousePos.x-obj.mouseOffsetLeft),0),maxX)+'px';
                    obj.moveELement.style.top=Math.min(Math.max((mousePos.y-obj.mouseOffsetTop),0),maxY)+'px';
                }
            },10);
            return false;
        });
        return obj;
    }
};
Dialog.prototype.init.prototype = Dialog.prototype;

addEvent($('#addPoll'),'click',function(e){
    alert('Add new!');
});