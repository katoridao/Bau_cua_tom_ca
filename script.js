const symbols = [
    "Bầu.png",
    "Cua.jpg",
    "Tôm.jpg",
    "Cá.jpg",
    "Gà.png",
    "Nai.jpg"
];

const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const rollButton = document.getElementById("roll");

// Khởi tạo biến điểm và đặt cược
let score = 100;
let chosenSymbol = null;
let betAmount = 0;

// Lấy các phần tử DOM
const scoreDisplay = document.getElementById("score");
const chosenSymbolDisplay = document.getElementById("chosen-symbol");
const betAmountInput = document.getElementById("bet-amount");
const symbolButtons = document.querySelectorAll(".symbols button");

// Xử lý khi chọn biểu tượng để đặt cược
symbolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chosenSymbol = button.dataset.symbol; // Lưu giá trị tên biểu tượng
    chosenSymbolDisplay.textContent = button.dataset.symbol;
  });
});



function addEffect(effect) {
  [dice1, dice2, dice3].forEach((dice) => {
    dice.classList.remove(effect); // Xóa lớp cũ trước khi thêm mới
    void dice.offsetWidth; // Buộc trình duyệt "reset" lại trạng thái DOM
    dice.classList.add(effect); // Thêm hiệu ứng mới
  });

  // Xóa hiệu ứng sau 1 giây
  setTimeout(() => {
    [dice1, dice2, dice3].forEach((dice) => {
      dice.classList.remove(effect);
    });
  }, 1000);
}


// Hàm để xử lý lắc xúc xắc và tính điểm
function rollDice() {
  // Lấy số tiền cược
  betAmount = parseInt(betAmountInput.value);

  if (!chosenSymbol) {
    alert("Hãy chọn một biểu tượng để đặt cược!");
    return;
  }

  if (isNaN(betAmount) || betAmount <= 0 || betAmount > score) {
    alert("Số tiền cược không hợp lệ!");
    return;
  }

  // Random biểu tượng cho từng xúc xắc
  const diceResult1 = symbols[Math.floor(Math.random() * symbols.length)];
  const diceResult2 = symbols[Math.floor(Math.random() * symbols.length)];
  const diceResult3 = symbols[Math.floor(Math.random() * symbols.length)];

  // Gán ảnh vào từng ô xúc xắc
  dice1.style.backgroundImage = `url('images/${diceResult1}')`;
  dice2.style.backgroundImage = `url('images/${diceResult2}')`;
  dice3.style.backgroundImage = `url('images/${diceResult3}')`;

  // Tạo mảng kết quả (chỉ giữ tên biểu tượng, bỏ phần mở rộng)
  const results = [diceResult1, diceResult2, diceResult3].map((result) =>
    result.split(".")[0]
  );

  // Kiểm tra số lần trùng khớp
  const matches = results.filter((result) => result === chosenSymbol).length;

  // Hiệu ứng thắng/thua
  if (matches > 0) {
    const reward = matches * betAmount;
    score += reward;
    addEffect("win-effect"); // Hiệu ứng thắng
  } else {
    score -= betAmount;
    addEffect("lose-effect"); // Hiệu ứng thua
  }

  // Trì hoãn thông báo để người chơi thấy giao diện
  setTimeout(() => {
    if (matches > 0) {
      alert(`Bạn đã thắng! Nhận được ${matches * betAmount} xu.`);
    } else {
      alert("Bạn đã thua! Mất số xu đã cược.");
    }

    // Cập nhật điểm
    scoreDisplay.textContent = score;

    // Reset cược
    chosenSymbol = null;
    chosenSymbolDisplay.textContent = "Chưa chọn";
    betAmountInput.value = "";

    // Kiểm tra nếu hết điểm
    if (score <= 0) {
      alert("Bạn đã hết xu! Trò chơi sẽ được reset.");
      score = 100;
      scoreDisplay.textContent = score;
    }
  }, 1000); // Trì hoãn 0.5 giây
}





// Gán sự kiện click cho nút "Lắc"
rollButton.addEventListener("click", rollDice);
