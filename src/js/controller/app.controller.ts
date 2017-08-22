/**
 * this controller serve common "Application" actions such as sidebar toggling
 */
$(() => {
    const pageMgr = new PageMgr();
    const popupMgr = new PopupMgr();

    $('.page-sidebar, .page-content')
        .on('click', '.toggle-btn, .switch-btn', function (e) {
            e.stopPropagation();

            pageMgr.toggleSidebar();
        });

    $('.page-sidebar')
        .on('click', 'li[data-section]', function (e) {
            e.stopPropagation();

            pageMgr.switchSection(this);
        });

    $('#notification-area')
        .on('click', '.notification-control', function (e) {
            e.stopPropagation();

            popupMgr.hide();
        });
});
