let expression = '';

function appendToDisplay(value) {
    expression += value;
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function calculateResult() {
    try {
        const result = safeEvaluate(expression);
        expression = result.toString();
    } catch (error) {
        expression = 'Error';
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = expression;
}
function safeEvaluate(expr) {

    if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
        throw new Error("Invalid expression");
    }

    // استخدم دالة جديدة (Function constructor) بدل eval
    return Function('"use strict"; return (' + expr + ')')();
}
function calculateMean() {
    const numbers = parseNumbers(expression);
    if (numbers.length === 0) {
        expression = 'Error';
    } else {
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        expression = mean.toFixed(2); // مثلا: 3.00
    }
    updateDisplay();
}

function calculateStd() {
    const numbers = parseNumbers(expression);
    if (numbers.length === 0) {
        expression = 'Error';
    } else {
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
        const std = Math.sqrt(variance);
        expression = std.toFixed(2); // مثلا: 1.41
    }
    updateDisplay();
}

// ✨ دالة لتحويل النص إلى مصفوفة أرقام
function parseNumbers(expr) {
    try {
        return expr.split(',').map(num => parseFloat(num.trim())).filter(n => !isNaN(n));
    } catch {
        return [];
    }
}
function backspace() {
    expression = expression.slice(0, -1); // نحذف آخر حرف
    updateDisplay();
}
