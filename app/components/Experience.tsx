import { useEffect, useRef, useState } from "react";
import PlanetScene from "./PlanetScene";

const routes = ["/", "/about", "/projects", "/contact"] as const;
const labels = ["首页", "关于", "业务", "联系"];

function HomePanel() {
  return (
    <section className="scene scene-home">
      <div className="scene-media media-home" aria-hidden="true"><PlanetScene /></div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>OSAKA / SHANGHAI</span>
      </header>
      <div className="editorial">
        <p className="kicker">连接日本与中国的商品与市场</p>
        <h1>
          扎根大阪，
          <br />
          连接中日商品
          <br />
          与消费市场。
        </h1>
        <div className="editorial-foot">
          <p>
            KUMOHIRO 专注中日间商品贸易，覆盖线上电子商务与线下商品进出口，
            为品牌、渠道和消费者建立高效可靠的跨境连接。
          </p>
          <span className="letter-link">了解我们的业务</span>
        </div>
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section className="scene scene-about">
      <div className="scene-media media-about" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>关于 / 01</span>
      </header>
      <div className="editorial">
        <p className="kicker">关于 KUMOHIRO</p>
        <h1>
          以大阪为起点，
          <br />
          打造可信赖的
          <br />
          中日贸易伙伴关系。
        </h1>
        <div className="editorial-foot">
          <p>
            我们理解日本与中国在市场、渠道和消费习惯上的差异，
            从选品、采购、沟通到交付，持续推动稳定而长期的商业合作。
          </p>
          <span className="letter-link">了解公司</span>
        </div>
      </div>
    </section>
  );
}

function ProjectsPanel() {
  const projects = [
    "跨境电子商务",
    "商品进口",
    "商品出口",
    "渠道与市场合作",
  ];
  return (
    <section className="scene scene-projects">
      <div className="scene-media media-projects" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>业务 / 02</span>
      </header>
      <div className="editorial">
        <p className="kicker">核心业务</p>
        <h1>
          线上电子商务
          <br />
          与线下进出口，
          <br />
          连接商品与市场。
        </h1>
        <div className="editorial-foot">
          <p>
            面向日本与中国市场，为合作伙伴提供商品选品、采购、销售、
            跨境物流及市场进入等贸易支持。
          </p>
          <span className="letter-link">查看业务方向</span>
        </div>
      </div>
      <div className="project-ghost">
        {projects.map((project, index) => (
          <span key={project}>
            0{index + 1} / {project}
          </span>
        ))}
      </div>
    </section>
  );
}

function ContactPanel() {
  return (
    <section className="scene scene-contact">
      <div className="scene-media media-contact" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <header className="topline">
        <span>KUMOHIRO</span>
        <span>联系 / 03</span>
      </header>
      <div className="editorial">
        <p className="kicker">大阪 / 面向日本与中国</p>
        <h1>
          期待与您聊聊
          <br />
          新的商品与合作机会。
        </h1>
        <div className="editorial-foot">
          <p>
            无论您是品牌方、供应商、渠道商，或正在寻找中日贸易合作伙伴，
            都欢迎与我们联系。
          </p>
          <a className="letter-link" href="mailto:yungoy@gmail.com">
            联系我们
          </a>
        </div>
      </div>
    </section>
  );
}

const panels = [HomePanel, AboutPanel, ProjectsPanel, ContactPanel];

export function Experience({ initialIndex = 0 }: { initialIndex?: number }) {
  const [active, setActive] = useState(initialIndex);
  const [previous, setPrevious] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [open, setOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const activeRef = useRef(initialIndex);
  const rootRef = useRef<HTMLElement>(null);
  const pointerFrame = useRef<number | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const onPop = () => {
      const index = Math.max(
        0,
        routes.indexOf(window.location.pathname as (typeof routes)[number]),
      );
      if (index !== activeRef.current) changeScene(index, false);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function changeScene(target: number, updateHistory = true) {
    const current = activeRef.current;
    if (target === current) {
      setOpen(false);
      return;
    }
    const nextDirection = target > current ? "forward" : "backward";
    setOpen(false);
    timers.current.push(
      window.setTimeout(() => {
        setDirection(nextDirection);
        setPrevious(current);
        setActive(target);
        activeRef.current = target;
        if (updateHistory) window.history.pushState({}, "", routes[target]);
        timers.current.push(window.setTimeout(() => setPrevious(null), 920));
      }, 260),
    );
  }

  function moveBackground(event: React.PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      rootRef.current?.style.setProperty("--mx", x.toFixed(3));
      rootRef.current?.style.setProperty("--my", y.toFixed(3));
    });
  }

  function resetBackground() {
    rootRef.current?.style.setProperty("--mx", "0");
    rootRef.current?.style.setProperty("--my", "0");
  }

  return (
    <main
      ref={rootRef}
      className="experience"
      onPointerMove={moveBackground}
      onPointerLeave={resetBackground}
    >
      {panels.map((Panel, index) => {
        const isActive = index === active;
        const isPrevious = index === previous;
        const className =
          isActive && previous !== null
            ? `scene-wrap enter-${direction}`
            : isPrevious
              ? `scene-wrap exit-${direction}`
              : `scene-wrap${isActive ? " current" : ""}`;
        return (
          <div className={className} key={index} aria-hidden={!isActive}>
            <Panel />
          </div>
        );
      })}
      <div className={`floating-menu ${open ? "is-open" : ""}`}>
        <div className="menu-side menu-left">
          {labels.slice(0, 2).map((label, index) => (
            <button
              key={label}
              className={active === index ? "active" : ""}
              onClick={() => changeScene(index)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "关闭导航" : "打开导航"}
        >
          <span className="explore-label">菜单</span>
          <span className="close-mark" />
        </button>
        <div className="menu-side menu-right">
          {labels.slice(2).map((label, index) => (
            <button
              key={label}
              className={active === index + 2 ? "active" : ""}
              onClick={() => changeScene(index + 2)}
              style={{ "--order": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
