/**
 * 
 * 入口js函数
 * 
 */


const LAZY_LOAD_ATTRIBUTE = "data-observerLazyLoad";

/**
 * 
 * @param {*} $type 判断使用哪种工具
 * @param {*} callback 监听回调
 * @param {*} target 监听目标元素
 * @param {*} $option 自定义配置参数
 */
export default function observerTools($type = "lazyLoad", target, $option, callback) {
    // 创建触底对象
    let onBottom = null;

    // 创建observer对象
    let observe = new IntersectionObserver(entries => {
        // 判断type传参
        switch ($type) {
            case "lazyLoad":
                // 判断元素和指定视口是否发生交叉，如果发生交叉
                entries.forEach((entriesChild, index) => {
                    if (entriesChild.isIntersecting) {
                        console.log("asssss");
                        // 取出监听元素的自定义属性
                        entriesChild.target.src = entriesChild.target.getAttribute(LAZY_LOAD_ATTRIBUTE);
                        // 移除监听的元素
                        observe.unobserve(entriesChild.target);
                    }else {
                        // 把默认的图片放在src中
                        entriesChild.target.src = $option.lazyLoading;
                    }
                })
                break;
            case "onBottom":
                // 如果末尾元素进入视口，则触底
                if (entries[0].isIntersecting) {
                    return callback(entries[0]);
                }
                break;

            case "onTop":
                // 判断交叉
                if (entries[0].boundingClientRect.top < 0) {
                    // 添加class类名
                    target[0].classList.add("observer_onTop");
                    return callback(entries[0]);
                } else {
                    target[0].classList.remove("observer_onTop")
                }
                break;
            case "listAnimation":
                entries.forEach(element => {
                    if (element.isIntersecting) {
                        element.target.classList.add("observe-animation-show")
                    }
                })
        }
    }, $option);
    // 如果type是onBottom
    switch ($type) {
        case "lazyLoad":
            // 判断目标元素是否存在, 如果是元素数组，就循环监听
            target.forEach(element => {
                let checkResult = isElement(element);
                if (checkResult) {
                    observe.observe(element); // 监听元素
                }
            });
            break;
        case "onBottom":
            // 在末尾追加一个标识符
            onBottom = document.createElement("div");
            // 给目标元素末尾添加标识符div
            onBottom.classList.add("observe_bottom_main")
            target[0].appendChild(onBottom);
            observe.observe(onBottom)
            break;
        case "onTop":
            // 创建一个div在吸顶元素之上
            let reference = document.createElement("div");
            reference.classList.add("observe_top_main")
            $option.root.insertBefore(reference, target[0]);
            // 监听目标元素
            observe.observe(reference);
        case "listAnimation":
            target.forEach(element => {
                observe.observe(element);
            })
    }

}

// 判断目标元素是否是element，不同浏览器类型都不一样
function isElement(obj) {
    return (typeof HTMLElement === 'object') ?
        (obj instanceof HTMLElement) :
        !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');
}