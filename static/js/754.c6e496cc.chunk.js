"use strict";(self.webpackChunkpma=self.webpackChunkpma||[]).push([[754],{6754:function(e,a,r){r.r(a),r.d(a,{default:function(){return Z}});var t=r(2791),n=r(9140),i=r(6144),s=r(3360),o=r(9434),c=r(9508),l=r(1413),d=r(2469),m=r(1134),u=r(5668),f=r(3168),x=r(184),v=function(){var e,a=(0,o.v9)((function(e){return e.modal})).data,r=a,t=r.id,n=r.title,i=r.order,v=(0,f.$)().t,h=(0,m.cI)({mode:"all"}),b=h.register,Z=h.handleSubmit,g=h.formState,p=g.errors,N=g.isValid,j=(0,o.I0)();return(0,x.jsx)("div",{className:"col",children:(0,x.jsxs)("form",{className:"d-flex align-items-center gap-1",onSubmit:Z((function(e){var r=(0,l.Z)((0,l.Z)({},a),{},{title:e.title,order:i});t&&(0,u.L9)(r).then((function(){j((0,c.nC)())}))})),children:[(0,x.jsx)("div",{className:"form-group",children:(0,x.jsx)("input",(0,l.Z)((0,l.Z)({className:"form-control"},b("title",{required:!0})),{},{type:"text",name:"title",id:"title",defaultValue:n}))}),"required"===(null===(e=p.title)||void 0===e?void 0:e.type)&&(0,x.jsx)(d.Z,{variant:"warning",children:v("editColumn.titleRequired")}),(0,x.jsx)(s.Z,{size:"sm",type:"submit",variant:"success",className:"bi-check-lg text-light",disabled:!N}),(0,x.jsx)(s.Z,{size:"sm",variant:"warning",className:"bi-x-lg text-light",onClick:function(){return j((0,c.Mr)("editColumn"))}})]})})},h=[{name:"addTask",icon:"bi-plus-circle",color:"text-primary"},{name:"remove",icon:"bi-trash",color:"text-danger"}],b=(0,t.lazy)((function(){return r.e(828).then(r.bind(r,4828))})),Z=function(e){var a=(0,o.I0)(),r=(0,o.v9)((function(e){return e})),t=r.modal,l=t.visible,d=t.data,m=r.setting,u=m.theme,f=m.maxHeight,Z=function(e,r,t){e.stopPropagation();var n="addTask"===r?{boardId:t.boardId,columnId:t.id,title:""}:t;a((0,c.h7)({name:r,data:n}))};return(0,x.jsxs)(n.Z,{className:"column-card flex-grow-0 flex-shrink-0 shadow-sm",bg:u,text:"dark"===u?"white":"dark",children:[(0,x.jsx)(n.Z.Header,{className:"gap-3",children:(0,x.jsxs)("div",{className:"row",children:[l.editColumn&&(null===d||void 0===d?void 0:d.id)===e.column.id?(0,x.jsx)(v,{}):(0,x.jsx)(n.Z.Title,{onClick:function(a){return Z(a,"editColumn",e.column)},className:"col",children:e.column.title}),(0,x.jsx)(i.Z,{className:"col-4 float-right",size:"sm",children:h.map((function(a){var r=a.name,t=a.icon,n=a.color;return(0,x.jsx)(s.Z,{className:"".concat(t," ").concat(n),variant:"link",onClick:function(a){return Z(a,r,e.column)}},r)}))})]})}),(0,x.jsx)(n.Z.Body,{style:{maxHeight:"".concat(f-100,"px")},className:"d-flex w-100 h-auto flex-column flex-grow-0 flex-shrink-0 gap-3 overflow-auto",children:(0,x.jsx)(b,{data:e})})]})}},9140:function(e,a,r){r.d(a,{Z:function(){return T}});var t=r(1413),n=r(5987),i=r(1694),s=r.n(i),o=r(2791),c=r(162),l=r(6543),d=r(3689),m=r(184),u=["bsPrefix","className","variant","as"],f=o.forwardRef((function(e,a){var r=e.bsPrefix,i=e.className,o=e.variant,l=e.as,d=void 0===l?"img":l,f=(0,n.Z)(e,u),x=(0,c.vE)(r,"card-img");return(0,m.jsx)(d,(0,t.Z)({ref:a,className:s()(o?"".concat(x,"-").concat(o):x,i)},f))}));f.displayName="CardImg";var x=f,v=r(6040),h=["bsPrefix","className","as"],b=o.forwardRef((function(e,a){var r=e.bsPrefix,i=e.className,l=e.as,d=void 0===l?"div":l,u=(0,n.Z)(e,h),f=(0,c.vE)(r,"card-header"),x=(0,o.useMemo)((function(){return{cardHeaderBsPrefix:f}}),[f]);return(0,m.jsx)(v.Z.Provider,{value:x,children:(0,m.jsx)(d,(0,t.Z)((0,t.Z)({ref:a},u),{},{className:s()(i,f)}))})}));b.displayName="CardHeader";var Z=b,g=["bsPrefix","className","bg","text","border","body","children","as"],p=(0,d.Z)("h5"),N=(0,d.Z)("h6"),j=(0,l.Z)("card-body"),k=(0,l.Z)("card-title",{Component:p}),y=(0,l.Z)("card-subtitle",{Component:N}),C=(0,l.Z)("card-link",{Component:"a"}),w=(0,l.Z)("card-text",{Component:"p"}),P=(0,l.Z)("card-footer"),I=(0,l.Z)("card-img-overlay"),H=o.forwardRef((function(e,a){var r=e.bsPrefix,i=e.className,o=e.bg,l=e.text,d=e.border,u=e.body,f=e.children,x=e.as,v=void 0===x?"div":x,h=(0,n.Z)(e,g),b=(0,c.vE)(r,"card");return(0,m.jsx)(v,(0,t.Z)((0,t.Z)({ref:a},h),{},{className:s()(i,b,o&&"bg-".concat(o),l&&"text-".concat(l),d&&"border-".concat(d)),children:u?(0,m.jsx)(j,{children:f}):f}))}));H.displayName="Card",H.defaultProps={body:!1};var T=Object.assign(H,{Img:x,Title:k,Subtitle:y,Body:j,Link:C,Text:w,Header:Z,Footer:P,ImgOverlay:I})}}]);
//# sourceMappingURL=754.c6e496cc.chunk.js.map