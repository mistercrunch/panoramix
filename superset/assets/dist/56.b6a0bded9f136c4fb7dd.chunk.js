(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{2464:function(a,e,t){"use strict";t.r(e);var r=t(974),n=t(1100),i=t.n(n),l=t(0),o=t.n(l),s=t(2199),c=t.n(s),d=t(943),f=t.n(d),b=t(361),u=t(93),p=t(362);t(2200);window.$&&c()(window,window.$);var g=window.$||c.a.$,h={data:o.a.arrayOf(o.a.object),height:o.a.number,alignPositiveNegative:o.a.bool,colorPositiveNegative:o.a.bool,columns:o.a.arrayOf(o.a.shape({key:o.a.string,label:o.a.string,format:o.a.string})),filters:o.a.object,includeSearch:o.a.bool,metrics:o.a.arrayOf(o.a.oneOfType([o.a.string,o.a.object])),onAddFilter:o.a.func,onRemoveFilter:o.a.func,orderDesc:o.a.bool,pageLength:o.a.oneOfType([o.a.number,o.a.string]),percentMetrics:o.a.arrayOf(o.a.oneOfType([o.a.string,o.a.object])),tableFilter:o.a.bool,tableTimestampFormat:o.a.string,timeseriesLimitMetric:o.a.oneOfType([o.a.string,o.a.object])},m=Object(b.c)(u.a.INTEGER),v=Object(b.c)(u.a.PERCENT_3_POINT);function y(){}function M(a,e){function t(a){for(var e=[],t=0;t<r.length;t+=1)e.push(r[t][a]);return e}var r=e.data,n=e.height,l=e.alignPositiveNegative,o=void 0!==l&&l,s=e.colorPositiveNegative,c=e.columns,d=e.filters,u=void 0===d?{}:d,h=e.includeSearch,M=e.metrics,T=e.onAddFilter,O=void 0===T?y:T,w=e.onRemoveFilter,x=void 0===w?y:w,N=e.orderDesc,j=e.pageLength,_=e.percentMetrics,k=e.tableFilter,F=e.tableTimestampFormat,A=e.timeseriesLimitMetric,P=g(a);P.addClass("superset-legacy-chart-table");for(var L=(M||[]).map(function(a){return a.label||a}).concat((_||[]).map(function(a){return"%"+a})).filter(function(a){return"number"==typeof r[0][a]}),E={},R={},$=0;$<L.length;$+=1)o?E[L[$]]=i.a.max(t(L[$]).map(Math.abs)):(E[L[$]]=i.a.max(t(L[$])),R[L[$]]=i.a.min(t(L[$])));var C=Object(p.c)(F),D=i.a.select(a);D.html("");var I=D.append("table").classed("dataframe dataframe table table-striped table-condensed table-hover dataTable no-footer",!0).attr("width","100%");I.append("thead").append("tr").selectAll("th").data(c.map(function(a){return a.label})).enter().append("th").text(function(a){return a}),I.append("tbody").selectAll("tr").data(r).enter().append("tr").selectAll("td").data(function(a){return c.map(function(e){var t,r=e.key,n=e.format,i=a[r],l=0<=L.indexOf(r);return"__timestamp"===r&&(t=C(i)),"string"==typeof i&&(t='<span class="like-pre">'+f.a.sanitize(i)+"</span>"),l&&(t=Object(b.c)(n)(i)),"%"===r[0]&&(t=v(i)),{col:r,val:i,html:t,isMetric:l}})}).enter().append("td").style("background-image",function(a){if(a.isMetric){var e=void 0!==s&&s&&0>a.val?150:0;if(o){var t=Math.abs(Math.round(a.val/E[a.col]*100));return"linear-gradient(to right, rgba("+e+",0,0,0.2), rgba("+e+",0,0,0.2) "+t+"%, rgba(0,0,0,0.01) "+t+"%, rgba(0,0,0,0.001) 100%)"}var r=Math.abs(Math.max(E[a.col],0)),n=Math.abs(Math.min(R[a.col],0)),i=r+n,l=Math.round(Math.min(n+a.val,n)/i*100),c=Math.round(Math.abs(a.val)/i*100);return"linear-gradient(to right, rgba(0,0,0,0.01), rgba(0,0,0,0.001) "+l+"%, rgba("+e+",0,0,0.2) "+l+"%, rgba("+e+",0,0,0.2) "+(l+c)+"%, rgba(0,0,0,0.01) "+(l+c)+"%, rgba(0,0,0,0.001) 100%)"}return null}).classed("text-right",function(a){return a.isMetric}).attr("title",function(a){return"string"==typeof a.val?a.val:Number.isNaN(a.val)?null:m(a.val)}).attr("data-sort",function(a){return a.isMetric?a.val:null}).classed("filtered",function(a){return u&&u[a.col]&&0<=u[a.col].indexOf(a.val)}).on("click",function(a){!a.isMetric&&k&&(i.a.select(this).classed("filtered")?(x(a.col,[a.val]),i.a.select(this).classed("filtered",!1)):(i.a.select(this).classed("filtered",!0),O(a.col,[a.val])))}).style("cursor",function(a){return a.isMetric?"":"pointer"}).html(function(a){return a.html?a.html:a.val});var S=P.find(".dataTable").DataTable({paging:j&&0<j,pageLength:j,aaSorting:[],searching:void 0!==h&&h,bInfo:!1,scrollY:n+"px",scrollCollapse:!0,scrollX:!0});!function(a,e){var t=a.find(".dataTables_scrollHead").height(),r=a.find(".dataTables_filter").height()||0,n=a.find(".dataTables_length").height()||0,i=a.find(".dataTables_paginate").height()||0,l=n>r?n:r;a.find(".dataTables_scrollBody").css("max-height",e-t-l-i)}(P.find(".dataTables_wrapper"),n);var J,z=Array.isArray(A)?A[0]:A;if(z?J=z.label||z:0<L.length&&(J=L[0]),J){var B=c.map(function(a){return a.key}).indexOf(J);S.column(B).order(N?"desc":"asc"),0>L.indexOf(J)&&S.column(B).visible(!1)}S.draw()}M.displayName="TableVis",M.propTypes=h;var T=M;e.default=Object(r.a)(T)}}]);