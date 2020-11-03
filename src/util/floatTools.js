// 加法函数
function accAdd (arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));

  return ((arg1 * m + arg2 * m) / m).toFixed(5);
}

// 给Number类型增加一个add方法，，使用时直接用 .add 即可完成计算。
Number.prototype.add = function(arg) {
  return accAdd(arg, this);
};

// 减法函数
/**
 * @return {string}
 */
function Subtr (arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // last modify by deeka
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个add方法，，使用时直接用 .sub 即可完成计算。
Number.prototype.sub = function(arg) {
  return Subtr(this, arg);
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul (arg1, arg2) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    if (s1.split('.')[1] !== undefined) {
      m += s1.split('.')[1].length;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    if (s2.split('.')[1] !== undefined) {
      m += s2.split('.')[1].length;
    }
  } catch (e) {
    console.log(e);
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function(arg) {
  return accMul(arg, this);
};
