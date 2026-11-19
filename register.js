document.addEventListener('DOMContentLoaded', () => {
    // تفعيل أيقونات Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // إظهار وإخفاء كلمة المرور وتأكيد كلمة المرور
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            button.innerHTML = isPassword
                ? '<i data-lucide="eye-off"></i>'
                : '<i data-lucide="eye"></i>';

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    // التحقق من البيانات عند إنشاء الحساب
    const registerForm = document.getElementById('registerForm');
    const formMessage = document.getElementById('formMessage');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('universityEmail').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            formMessage.className = 'form-message';

            if (!fullName || !email || !password || !confirmPassword) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.add('error');
                return;
            }

            if (password.length < 6) {
                formMessage.textContent = 'Password must be at least 6 characters.';
                formMessage.classList.add('error');
                return;
            }

            if (password !== confirmPassword) {
                formMessage.textContent = 'Passwords do not match.';
                formMessage.classList.add('error');
                return;
            }

            // حفظ بيانات الحساب محلياً والانتقال
            localStorage.setItem('campusxUser', JSON.stringify({ fullName, email }));

            formMessage.textContent = 'Account created successfully! Redirecting...';
            formMessage.classList.add('success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 900);
        });
    }
});