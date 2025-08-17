// 应用主逻辑
class YeehaApp {
    constructor() {
        this.currentTab = 'home';
        this.tabHistory = ['home'];
        this.animationQueue = [];
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupRedPacketAnimations();
        this.startJellyBounce();
    }

    bindEvents() {
        // 底部导航点击事件
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // 红包入口点击事件
        const redpacketEntry = document.getElementById('redpacketEntry');
        redpacketEntry.addEventListener('click', () => {
            this.showRedPacketModal();
        });

        // 关闭弹窗事件
        const closeModal = document.getElementById('closeModal');
        closeModal.addEventListener('click', () => {
            this.hideRedPacketModal();
        });

        // 活动项目点击事件
        document.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const activity = e.currentTarget.dataset.activity;
                this.handleActivityClick(activity);
            });
        });

        // 点击弹窗外部关闭
        document.getElementById('redpacketModal').addEventListener('click', (e) => {
            if (e.target.id === 'redpacketModal') {
                this.hideRedPacketModal();
            }
        });
    }

    // Tab切换逻辑
    switchTab(newTab) {
        if (newTab === this.currentTab || this.isAnimating) return;

        const oldTab = this.currentTab;
        this.isAnimating = true;

        // 记录tab历史
        this.tabHistory.push(newTab);
        if (this.tabHistory.length > 10) {
            this.tabHistory.shift();
        }

        // 更新导航状态
        this.updateNavigation(newTab);

        // 切换页面内容
        this.switchPageContent(newTab, oldTab);

        // 触发红包入口动画
        this.triggerRedPacketAnimation(newTab, oldTab);

        // 更新当前tab
        this.currentTab = newTab;

        // 动画完成后重置状态
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }

    // 更新导航状态
    updateNavigation(activeTab) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-tab="${activeTab}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }

    // 切换页面内容
    switchPageContent(newTab, oldTab) {
        const oldContent = document.getElementById(oldTab);
        const newContent = document.getElementById(newTab);

        if (oldContent && newContent) {
            // 旧内容淡出
            oldContent.classList.add('fade-out');
            
            setTimeout(() => {
                oldContent.classList.remove('active', 'fade-out');
                
                // 新内容淡入
                newContent.classList.add('active', 'fade-in');
                
                setTimeout(() => {
                    newContent.classList.remove('fade-in');
                }, 300);
            }, 150);
        }
    }

    // 设置红包入口动画
    setupRedPacketAnimations() {
        // 定义不同tab切换时的动画效果
        this.tabAnimations = {
            'home': {
                'discover': 'rotate-fly',
                'message': 'blinds-effect',
                'profile': 'slide-left',
                'wallet': 'zoom-in'
            },
            'discover': {
                'home': 'rotate-fly',
                'message': 'slide-right',
                'profile': 'blinds-effect',
                'wallet': 'slide-left'
            },
            'message': {
                'home': 'blinds-effect',
                'discover': 'slide-left',
                'profile': 'rotate-fly',
                'wallet': 'slide-right'
            },
            'profile': {
                'home': 'slide-right',
                'discover': 'blinds-effect',
                'message': 'rotate-fly',
                'wallet': 'blinds-effect'
            },
            'wallet': {
                'home': 'zoom-in',
                'discover': 'slide-right',
                'message': 'slide-left',
                'profile': 'rotate-fly'
            }
        };
    }

    // 触发红包入口动画
    triggerRedPacketAnimation(newTab, oldTab) {
        const redpacketEntry = document.getElementById('redpacketEntry');
        
        // 根据tab切换组合确定动画类型
        const animationType = this.getTabSwitchAnimation(oldTab, newTab);
        
        console.log(`Tab切换动画: ${oldTab} -> ${newTab}, 动画类型: ${animationType}`);

        // 移除之前的动画类
        redpacketEntry.classList.remove(
            'rotate-fly', 'blinds-effect', 'slide-left', 'slide-right', 'zoom-in',
            'tab-1-to-2', 'tab-2-to-3', 'tab-3-to-4', 'tab-4-to-5', 'tab-5-to-1',
            'tab-2-to-1', 'tab-3-to-2', 'tab-4-to-3', 'tab-5-to-4', 'tab-1-to-5'
        );

        // 添加新的动画类
        redpacketEntry.classList.add(animationType);
        console.log('添加动画类:', animationType);
        console.log('当前红包入口类名:', redpacketEntry.className);

        // 动画结束后恢复果冻弹跳
        setTimeout(() => {
            redpacketEntry.classList.remove(animationType);
            console.log('移除动画类:', animationType);
            this.startJellyBounce();
        }, 800);
    }

    // 获取tab切换动画类型
    getTabSwitchAnimation(oldTab, newTab) {
        const tabOrder = ['home', 'discover', 'message', 'profile', 'wallet'];
        const oldIndex = tabOrder.indexOf(oldTab);
        const newIndex = tabOrder.indexOf(newTab);
        
        // 计算tab切换方向
        const direction = newIndex - oldIndex;
        const isForward = direction > 0 || (oldTab === 'wallet' && newTab === 'home');
        const isBackward = direction < 0 || (oldTab === 'home' && newTab === 'wallet');
        
        // 根据切换方向返回不同的动画
        if (isForward) {
            if (oldTab === 'home' && newTab === 'discover') return 'tab-1-to-2';
            if (oldTab === 'discover' && newTab === 'message') return 'tab-2-to-3';
            if (oldTab === 'message' && newTab === 'profile') return 'tab-3-to-4';
            if (oldTab === 'profile' && newTab === 'wallet') return 'tab-4-to-5';
            if (oldTab === 'wallet' && newTab === 'home') return 'tab-5-to-1';
        } else if (isBackward) {
            if (oldTab === 'discover' && newTab === 'home') return 'tab-2-to-1';
            if (oldTab === 'message' && newTab === 'discover') return 'tab-3-to-2';
            if (oldTab === 'profile' && newTab === 'message') return 'tab-4-to-3';
            if (oldTab === 'wallet' && newTab === 'profile') return 'tab-5-to-4';
            if (oldTab === 'home' && newTab === 'wallet') return 'tab-1-to-5';
        }
        
        // 默认动画
        return 'zoom-in';
    }

    // 开始果冻弹跳动画
    startJellyBounce() {
        const redpacketEntry = document.getElementById('redpacketEntry');
        // 移除内联样式，恢复CSS类的动画
        redpacketEntry.style.removeProperty('animation');
        // 确保有jellyBounce类
        redpacketEntry.classList.add('jelly-bounce');
        console.log('恢复果冻弹跳动画，当前类名:', redpacketEntry.className);
    }

    // 显示红包活动弹窗
    showRedPacketModal() {
        const modal = document.getElementById('redpacketModal');
        const redpacketEntry = document.getElementById('redpacketEntry');

        // 添加点击效果
        redpacketEntry.classList.add('clicked');
        setTimeout(() => {
            redpacketEntry.classList.remove('clicked');
        }, 300);

        // 显示弹窗
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 隐藏红包活动弹窗
    hideRedPacketModal() {
        const modal = document.getElementById('redpacketModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // 处理活动点击
    handleActivityClick(activity) {
        console.log(`点击了活动: ${activity}`);
        
        // 根据活动类型跳转到不同页面
        switch (activity) {
            case 'friend':
                this.navigateToFriendList();
                break;
            case 'rain':
                this.navigateToRedPacketRain();
                break;
            case 'invite':
                this.navigateToInvitePage();
                break;
            case 'coins':
                this.navigateToTaskList();
                break;
        }

        // 关闭弹窗
        this.hideRedPacketModal();
    }

    // 跳转到好友列表
    navigateToFriendList() {
        window.location.href = 'friend-list.html';
    }

    // 跳转到红包雨规则页面
    navigateToRedPacketRain() {
        window.location.href = 'redpacket-rain.html';
    }

    // 跳转到邀请页面
    navigateToInvitePage() {
        window.location.href = 'invite.html';
    }

    // 跳转到任务列表
    navigateToTaskList() {
        window.location.href = 'task-list.html';
    }

    // 获取当前tab
    getCurrentTab() {
        return this.currentTab;
    }

    // 获取tab历史
    getTabHistory() {
        return [...this.tabHistory];
    }

    // 返回上一个tab
    goBack() {
        if (this.tabHistory.length > 1) {
            this.tabHistory.pop(); // 移除当前tab
            const previousTab = this.tabHistory[this.tabHistory.length - 1];
            this.switchTab(previousTab);
        }
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.yeehaApp = new YeehaApp();
    
    // 添加一些调试信息
    console.log('Yeeha App 初始化完成');
    console.log('当前tab:', window.yeehaApp.getCurrentTab());
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    window.yeehaApp.switchTab('home');
                    break;
                case '2':
                    e.preventDefault();
                    window.yeehaApp.switchTab('discover');
                    break;
                case '3':
                    e.preventDefault();
                    window.yeehaApp.switchTab('message');
                    break;
                case '4':
                    e.preventDefault();
                    window.yeehaApp.switchTab('profile');
                    break;
                case '5':
                    e.preventDefault();
                    window.yeehaApp.switchTab('wallet');
                    break;
            }
        }
    });
});

// 添加触摸手势支持
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // 水平滑动距离大于垂直滑动距离，且大于50px时触发
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const currentTab = window.yeehaApp.getCurrentTab();
        const tabs = ['home', 'discover', 'message', 'profile', 'wallet'];
        const currentIndex = tabs.indexOf(currentTab);
        
        if (deltaX > 0 && currentIndex > 0) {
            // 向右滑动，切换到上一个tab
            window.yeehaApp.switchTab(tabs[currentIndex - 1]);
        } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
            // 向左滑动，切换到下一个tab
            window.yeehaApp.switchTab(tabs[currentIndex + 1]);
        }
    }
});

// 添加性能监控
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
