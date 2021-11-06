const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ctx.fillStyle = 'blue';
// ctx.beginPath();
// ctx.arc(70, 70, 50, 0, 2*Math.PI, false);
// ctx.fill();

const productList = new Array(
    {
        name: '전기자전거',
        color: 'red'
    },
    {
        name: '블루투스',
        color: 'blue'
    },
    {
        name: '액션캠코더',
        color: 'green'
    },
    {
        name: '비즈니스팩',
        color: 'purple'
    },
    {
        name: '바람막이',
        color: 'yellow'
    },
    {
        name: '거치대',
        color: 'orange'
    },
    {
        name: '마일리지',
        color: 'pink'
    }
)

ctx.translate(500, 500);

productList.forEach(function(e, i) {
    ctx.beginPath();
    ctx.arc(0, 0, 300, 0, (360/productList.length)*(Math.PI/180), false);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = e.color;
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';
    ctx.font = '15px sanserif';
    ctx.fillText(e.name, 200, 50);

    ctx.rotate((360/productList.length)*(Math.PI/180));
});
// 중앙에 하안 원 채워넣기
// ctx.beginPath();
// ctx.arc(0, 0, 200, 0, 360*(Math.PI/180));
// ctx.fillStyle = 'white';
// ctx.fill();

