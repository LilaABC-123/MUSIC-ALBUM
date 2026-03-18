// Content tabs (pill) - close button
document.querySelectorAll('.tab-pill').forEach(pill => {
    pill.querySelector('.tab-close')?.addEventListener('click', function(e) {
        e.stopPropagation();
        if (pill.classList.contains('tab-pill--active')) {
            const next = pill.nextElementSibling;
            if (next) next.classList.add('tab-pill--active');
        }
        pill.remove();
    });
});

// Card tabs switching (Status Change Logs / Room Entry/Exit Records)
document.querySelectorAll('.card-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.card-tab').forEach(t => t.classList.remove('card-tab--active'));
        this.classList.add('card-tab--active');
    });
});
