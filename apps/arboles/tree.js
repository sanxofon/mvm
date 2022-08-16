    function Q(root, selector) {
      if(typeof root === "string"){selector = root;root = document;}
      return root.querySelectorAll(selector);
    }
    function O(root, selector) {
      if (typeof root === "string") {selector = root;root = document;}
      return root.querySelector(selector);
    }
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var sto = null;
    var tim = O('#tim').value;
    var variedades = O('#variedades');
    const recargar = O('#recargar');
    var recarga = recargar.checked;

    recargar.addEventListener('change', (event) => {
      recarga=event.target.checked;
      if (event.target.checked) getData();
      else clearTimeout(sto);
    })
    
    var width = window.innerWidth-20;

    if(width>640)width=640;
    var height = width-0;
    var svg = d3.select("#svgcontainer").append("svg").attr("width", width).attr("height", height);
    // var svg = d3.select("svg"),
    // width = +svg.attr("width"),
    // height = +svg.attr("height");

    var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line");

    var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g.node");

    var info = svg.append("text")
    .attr("class", "info")
    .attr("transform", "translate(10,20)");

    var radius = "8",
    maxradius = "10";

    var color = d3.scaleOrdinal()
    .range(["#ff0000", "#111111", "#222222", "#333333", "#444444", "#555555", "#666666", "#777777", "#888888", "#999999", "#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"]);

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) {
      return d.index;
    }))
    .force("charge",d3.forceManyBody().strength(-200).distanceMax(height / 5)
    .distanceMin(height / 10))//, d3.forceManyBody().distanceMax(height / 2))
    .force("center", d3.forceCenter(width / 2, height / 2));

    var memn = 0;
    getData();

    //get chart data 
    function getData() {
      d3.selectAll("svg > g.nodes > g.node > *").remove();
      clearTimeout(sto);
      var n = parseInt(O('#numver').value);
      if (n!=memn) {
        memn = n;
        O('#msg').value=1;
      } else {
        O('#msg').value=parseInt(O('#msg').value)+1;
      }
      // var data = { "nodes": [ { "name": "0", "group": 1 }, { "name": "1", "group": 3 }, { "name": "2", "group": 4 }, { "name": "3", "group": 5 }, { "name": "4", "group": 7 }, { "name": "5", "group": 8 }, { "name": "6", "group": 9 }, { "name": "7", "group": 10 }, { "name": "8", "group": 12 }, { "name": "9", "group": 13 }, { "name": "10", "group": 14 } ], "links": [ { "source": "0", "target": "1", "weight": 2 }, { "source": "1", "target": "2", "weight": 2 }, { "source": "2", "target": "5", "weight": 2 }, { "source": "3", "target": "4", "weight": 2 }, { "source": "0", "target": "7", "weight": 2 }, { "source": "1", "target": "6", "weight": 2 }, { "source": "5", "target": "3", "weight": 2 }, { "source": "3", "target": "8", "weight": 2 }, { "source": "1", "target": "9", "weight": 2 }, { "source": "7", "target": "10", "weight": 2 } ] };
      var data = createTree(n);
      agregarVariedad(data);
      buildNetwork(data);
      if (recarga) sto = setTimeout(function(){getData();},tim);
    };

    function createTree(n) {
      var data = {
        "nodes": [{
          "name": "0",
          "group": 1
        }],
        "links": []
      };
      for (i=1;i<n;i++){
        var r = getRandomInt(0,data['nodes'].length-1);
        data['nodes'].push({
          "name": String(i),
          "group": parseInt(i/(n/14))+2
        });
        data['links'].push({
          "source": String(r),
          "target": String(data['nodes'].length-1),
          "weight": 2
        });
      }
      return data;
    }

    function agregarVariedad(data) {

      var nod = {};
      for (var i = 0; i < data['nodes'].length; i++) {
        nod[data['nodes'][i]['name']] = {};
        for (var j = 0; j < data['links'].length; j++) {
          if (data['links'][j]['source']==data['nodes'][i]['name']) {
            nod[data['nodes'][i]['name']][data['links'][j]['target']]={};
          } else if (data['links'][j]['target']==data['nodes'][i]['name']) {
            nod[data['nodes'][i]['name']][data['links'][j]['source']]={};
          }
        }
      }
      var nk = Object.keys(nod);

      var used = [];
      var centro = {};
      var ckk = null;
      for (var i = 0; i < nk.length; i++) {
        ckk = Object.keys(nod[nk[i]]);
        if (ckk.length>=3) {
          used.push(nk[i]);
          centro[nk[i]] = {};
          for (var j = 0; j < ckk.length; j++) {
            centro[nk[i]][ckk[j]] = {};
          }
        }
      }
      var ck = Object.keys(centro);
      var ckk = null;
      var l = 0;
      for (var i = 0; i < ck.length; i++) {
        centro[ck[i]] = recur(JSON.parse(JSON.stringify(nod[ck[i]])),JSON.parse(JSON.stringify(nod)),[ck[i]],ck);
      }
      variedades.innerHTML = "";
      var tipo = medirArbol(JSON.parse(JSON.stringify(centro)));
      variedades.innerHTML += JSON.stringify(tipo, null, 4);
      variedades.innerHTML += "\n---\n"+JSON.stringify(centro, null, 4);
      variedades.innerHTML += "\n---\n"+JSON.stringify(data, null, 4);
    }

    function medirArbol(c) {
      var k = Object.keys(c);
      var m = {};
      var temp = null;
      for (var i = 0; i < k.length; i++) {
        var kk = Object.keys(c[k[i]]);
        m[k[i]] = {};
        for (var j = 0; j < kk.length; j++) {
          m[k[i]][kk[j]] = recurMedir( JSON.parse(JSON.stringify(c[k[i]][kk[j]])));
          if (m[k[i]][kk[j]]==0) {
            m[k[i]][kk[j]] = c[k[i]][kk[j]]
          }
        }
      }
      return m;
    }
    function recurMedir(c,m=1) {
      var k = Object.keys(c);
      for (var i = 0; i < k.length; i++) {
        m++;
        m = recurMedir(c[k[i]],m);
      }
      if (c==0) return 0;
      else return m;
    }

    function recur(c,n,u=[],m=[]) {
      var ck = Object.keys(c);
      if (ck.length<2) return 1;
      var s = null;
      for (var i = 0; i < ck.length; i++) {
        s = String(ck[i]);
        if (m.includes(s)) {
          if (u.includes(s)) {
            c[s] = 0;
            delete c[s];
          } else {
            c[s] = 0;
            u.push(s);
          }
        } else if (u.includes(s)) {
          delete c[s];
        } else {
          u.push(s);
          c[s] = recur(n[s],n,u,m);
        }
      }
      return c;
    }

    function buildNetwork(data) {
      link = link.data(data.links);
      link.exit().remove();
      link = link.enter().append("line")
      .attr("stroke-width", function(d) {
        return 2;
      })
      .merge(link);

      node = node.data(data.nodes);
      node.exit().remove();
      node = node.enter().append("g")
      .attr("class", "node")
      .merge(node)
      .on("click", function(d, i) {
        d3.event.stopPropagation();
        loadInfo(d, i);
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("mouseover", function() {
        d3.select(this).select("circle").attr("border", 1);
      })
      .on("mouseout", function() {
        d3.select(this).select("circle").attr("border", 0);
      });


      node.append("circle")
        .attr("r", function(d) {
          return 18-parseInt(d.group/2);
        })
      .attr("fill", function(d) {
          return color(d.group);
        });

      node.append("text")
        // .attr("dx", function(d) { "12px"; }) // posiciona el texto a la derecha del círculo
        .attr("dx", function(d) { if(d.name>9)return "-11px";else return "-5px"; }) // Posiciona el texto al centro del círculo
        .attr("dy", ".35em")
        .text(function(d) { return d.name });

      node.append("text")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.id;
        });

      simulation
        .nodes(data.nodes)
        .on("tick", ticked);

      simulation.force("link")
        .links(data.links)
        .distance(function(d) {
          return 30;
        });

      simulation.alpha(1).restart();

      function ticked() {
        link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });
        node
        .attr("transform", function(d) {
          var boundx = Math.max(maxradius, Math.min(width - maxradius, d.x));
          var boundy = Math.max(maxradius, Math.min(height - maxradius, d.y));
          return "translate(" + boundx + "," + boundy + ")";
        });
      }
    }

    function loadInfo(d, i) {
      if (d3.event.defaultPrevented) return; // dragged
      var information = "Name: " + d.name + ", Group: " + d.group;
      info.text(information);
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.6).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = Math.max(maxradius, Math.min(width - maxradius, d3.event.x));
      d.fy = Math.max(maxradius, Math.min(height - maxradius, d3.event.y));
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }