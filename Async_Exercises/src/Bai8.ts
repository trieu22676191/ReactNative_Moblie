Promise.resolve(2).then((n) =>{
    console.log("Giá trị ban đầu:", n);
    const binh = n * n;
    console.log("Sau khi bình phương:", binh);
    return binh;
}).then((n)=>{
    const x2 = n * 2;
    console.log("Sau khi nhân 2:", x2);
    return x2;
}).then((n)=>{
    const cong = n + n;
    console.log("Sau khi cộng:", cong);
    return cong;
}).then((res)=>{
    console.log("Kết quả cuối cùng:", res);
});