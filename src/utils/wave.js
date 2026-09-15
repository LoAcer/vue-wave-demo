class Wave {
  constructor({
    canvasWidth, // 轴长
    canvasHeight, // 轴高
    waveWidth = 0.055, // 波浪宽度,数越小越宽
    waveHeight = 6, // 波浪高度,数越大越高
    xOffset = 0,
    speed = 0.04,
    colors = ['#DBB77A', '#BF8F3B'], // 波浪颜色
  } = {}) {
    this.points = [];
    this.startX = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.waveWidth = waveWidth;
    this.waveHeight = waveHeight;
    this.xOffset = xOffset;
    this.speed = speed;
    this.colors = colors;
  }

  getChartColor(ctx) {
    const radius = this.canvasWidth / 2;
    const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
    grd.addColorStop(0, this.colors[0]);
    grd.addColorStop(1, this.colors[1]);
    return grd;
  }

  draw(ctx) {
    ctx.save();
    const points = this.points;
    ctx.beginPath();
    let n=0;
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      ctx.lineTo(point[0], point[1]);
      point[1] -n >0 && (n=point[1]);
    }
    ctx.lineTo(this.canvasWidth, n);
    ctx.lineTo(this.startX, n);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = this.getChartColor(ctx);
    ctx.fill();
    ctx.restore();
  }

  update({
    nowRange,
  } = {}) {
    this.points = [];
    const {
      startX, waveHeight, waveWidth, canvasWidth, canvasHeight, xOffset,
    } = this;
    for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
      const y = Math.sin(((startX + x) * waveWidth) + xOffset);
      const dY = canvasHeight * (1 - (nowRange / 100));
      this.points.push([x, dY + (y * waveHeight)]);
    }
    this.xOffset += this.speed;
  }

  dict(ctx) {
    let n = 0;
    for (let i = 0; i < this.points.length; i += 1) {
      const point = this.points[i];
      point[1] - n > 0 && (n = point[1])
    }
    n-=.1;
    ctx.beginPath(),
    ctx.lineTo(this.startX, n),
    ctx.lineTo(this.canvasWidth, n),
    ctx.lineTo(this.canvasWidth, this.canvasHeight),
    ctx.lineTo(this.startX, this.canvasHeight),
    ctx.lineTo(this.startX, n),
    ctx.fillStyle = this.getChartColor(ctx),
    ctx.fill(),
    ctx.restore()
  }

  drawSign({ctx, xOffset: t=0, nowRange: s=0}={}) {// ctx 未定义
    const points = []
      , {startX: i, waveHeight: r, waveWidth: o, canvasWidth: l, canvasHeight: c} = this;
    ctx.beginPath(),
    ctx.lineWidth = 1;
    for (let p = i; p < i + l; p += 20 / l) {
      const S = r * Math.sin((i + p) * o + t);
      points.push([p, (1 - s) * c + S]),
      ctx.lineTo(p, (1 - s) * c + S)
    }
    ctx.lineTo(l, c),
    ctx.lineTo(i, c),
    points.length > 0 && ctx.lineTo(n[0][0], n[0][1]);
    const radius = l / 2
      , grd = ctx.createLinearGradient(radius, radius, radius, c);
    grd.addColorStop(0, "#F39C6B"),
    grd.addColorStop(1, "#A0563B"),
    ctx.fillStyle = radius,
    ctx.fill()
  }

  drawBackground(ctx, thinker=0) {
    const r = this.canvasWidth / 2
      , cR = r + thinker;
    ctx.beginPath(),
    ctx.arc(r, r, cR, 0, 2 * Math.PI);
    const grd = ctx.createRadialGradient(r, r, r / 2, r, r, r);
    grd.addColorStop(0, "rgba(127, 57, 242, 0"),
    grd.addColorStop(1, "rgba(255, 195, 103, 0.11)"),
    ctx.fillStyle = grd,
    ctx.fill()
  }

  drawCircle(ctx, lineWidth=2) {
    const r = this.canvasWidth / 2
      , innerR = r - lineWidth;
    ctx.lineWidth = lineWidth,
    ctx.beginPath(),
    ctx.arc(r, r, innerR, 0, 2 * Math.PI),
    ctx.strokeStyle = "rgba(186, 165, 130, 0.5)",
    ctx.stroke(),
    ctx.clip()
  }

  drawStar(ctx, s=2, r=70, R=140) {
    const x= Math.floor(this.canvasWidth/2);
    const y= Math.floor(this.canvasWidth/2);
    if(R > this.canvasWidth/2){
      R = this.canvasWidth/2;
    }
    r = R / 2.618;
    ctx.beginPath(),
    ctx.strokeStyle = "rgba(186, 165, 130, 0.9)",
    ctx.lineWidth = s;
    for (let l = 0; l < 5; l += 1)
        ctx.lineTo(Math.cos((18 + l * 72) / 180 * Math.PI) * R + x, -Math.sin((18 + l * 72) / 180 * Math.PI) * R + y),
        ctx.lineTo(Math.cos((54 + l * 72) / 180 * Math.PI) * r + x, -Math.sin((54 + l * 72) / 180 * Math.PI) * r + y);
    ctx.closePath(),
    ctx.stroke(),
    ctx.clip()
  }

  hexagram(ctx,lineWidth=2) {
    const x = Math.floor(this.canvasWidth/2);
    const y = Math.floor(this.canvasWidth/2);
    const R = Math.floor(this.canvasWidth/2);
    const r = R/Math.sqrt(3);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(186, 165, 130, 0.9)",
    ctx.lineWidth = lineWidth;
    for(let i=0;i<6;i++){
      ctx.lineTo(Math.cos((i * 60) / 180 * Math.PI) * r + x, -Math.sin((i * 60) / 180 * Math.PI) * r + y);
      ctx.lineTo(Math.cos((30 + i * 60) / 180 * Math.PI) * R + x, -Math.sin((30 + i * 60) / 180 * Math.PI) * R + y);     
    }

    ctx.closePath();
    ctx.stroke();
    ctx.clip();
  }

  drawRoundRect(ctx, lineWidth=2, x = 220, y = 5, width = 280, height = 650) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
    ctx.lineWidth = lineWidth;
    const value = height - width;
    let radius = width / 2;
    if(value < 0) {
      radius = height/2;
    }
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    ctx.lineTo(width - radius + x, y);
    ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    ctx.lineTo(width + x, height + y - radius);
    ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    ctx.lineTo(radius + x, height + y);
    ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();
  }

  drawHeart(ctx, lineWidth=2, x = 150, y = 130, a = 9) {
    const vertices = [];
    for(let i = 0; i < 50; i += 1) {
      const step = i/50*(Math.PI*2); // 设置心上面两点之间的角度，具体分成多少份，好像需要去试。
      const vector = {
        x: a*(16 * Math.pow(Math.sin(step), 3)),
        y: a*(13 * Math.cos(step) - 5 * Math.cos(2 * step) - 2 * Math.cos(3 * step) - Math.cos(4 * step))
      }
      vertices.push(vector);
    }
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(Math.PI);
    for(let i = 0; i < 50; i += 1) {
      const vector = vertices[i];
      ctx.lineTo(vector.x, vector.y);
    }
    ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
    ctx.clip();
  }

  drawHeartPolar(ctx){
    const a = 160;          // 心形大小，可调
    const centerX = this.canvasWidth/2;    // 画布中心 X
    const centerY = this.canvasHeight/2;    // 画布中心 Y

    // 1. 画坐标轴（辅助线，可选）
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(this.canvasWidth, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, this.canvasHeight);
    ctx.stroke();

    // 2. 画心形线
    ctx.strokeStyle = "rgba(186, 165, 130, 0.9)",
    ctx.lineWidth = 2;
    ctx.beginPath();

    const steps = 360;   // 步数越多越平滑
    for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;  // 0 到 2π

        // 极坐标转直角坐标
        const r = a * (1 - Math.sin(theta));
        const x = centerX + r * Math.cos(theta);
        const y = centerY - r * Math.sin(theta);  // 注意：Canvas 的 Y 轴向下，要取反

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.restore();
    ctx.clip();
  }
}

export default Wave;

