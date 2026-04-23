const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Khởi chạy ứng dụng Electron
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- Task 1: Thêm một todo item mới ---
    // Tìm ô input và nhập nội dung
    const input = window.locator('#todo-input');
    await input.fill(taskText);
    
    // Tìm và nhấn nút Add
    const addButton = window.locator('#add-todo-btn');
    await addButton.click();


    // --- Task 2: Xác minh todo item đã được thêm ---
    // Định vị item đầu tiên trong danh sách
    const todoItem = window.locator('.todo-item').first();
    
    // Kiểm tra xem text có khớp với nội dung đã nhập không
    await expect(todoItem).toContainText(taskText);
    

    // --- Task 3: Đánh dấu hoàn thành (Mark as complete) ---
    // Tìm checkbox bên trong todo item và click
    const checkbox = todoItem.locator('input[type="checkbox"]');
    await checkbox.click();

    // Kiểm tra xem class 'completed' đã được thêm vào li hay chưa
    await expect(todoItem).toHaveClass(/completed/);


    // --- Task 4: Xóa todo item ---
    // Tìm nút delete bên trong todo item và click
    const deleteButton = todoItem.locator('.delete-btn');
    await deleteButton.click();

    // Xác nhận rằng item đó không còn tồn tại trên trang
    await expect(todoItem).toBeHidden();


    // Đóng ứng dụng
    await electronApp.close();
});