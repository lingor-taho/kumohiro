const services = [
  { no: "01", en: "Lifestyle Goods", jp: "生活雑貨", text: "日本の感性と品質を、世界の日常へ。企画から調達、輸出まで一貫して支えます。" },
  { no: "02", en: "Food & Ingredients", jp: "食品・原料", text: "産地と市場を丁寧につなぎ、安全で持続可能な食の流通をつくります。" },
  { no: "03", en: "Industrial Materials", jp: "産業資材", text: "確かな技術と供給力をもつパートナーと、ものづくりの未来を支えます。" },
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Kowa Trading ホーム">KŌWA<span>光和貿易株式会社</span></a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a><a href="#business">Business</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="mailto:hello@kowa-trading.jp">Talk to us <span>↗</span></a>
      </header>

      <section id="top" className="hero shell">
        <div className="eyebrow"><span>Tokyo · Japan</span><span>International Trading Company</span></div>
        <h1><span>Connecting</span><span className="indent">quality.</span><span>Creating <i>value.</i></span></h1>
        <div className="hero-bottom">
          <p>国境を越え、価値をつなぐ。<br />信頼から始まる、新しい商流を。</p>
          <a className="round-link" href="#business" aria-label="事業を見る"><span>Explore</span><b>↓</b></a>
        </div>
      </section>

      <section id="about" className="statement shell">
        <p className="section-label">( About us )</p>
        <div>
          <h2>Good trade begins<br />with good relationships.</h2>
          <p>光和貿易は、東京を拠点に世界のつくり手と市場をつなぐ専門商社です。数字だけでなく、その先にいる人と文化を理解すること。誠実な対話を重ね、長く続く価値をともにつくります。</p>
        </div>
      </section>

      <section id="business" className="business shell">
        <div className="business-head"><p className="section-label">( Our business )</p><p>Across markets,<br />beyond expectations.</p></div>
        <div className="service-list">
          {services.map((item) => <article key={item.no}>
            <span className="number">{item.no}</span>
            <h3>{item.en}<small>{item.jp}</small></h3>
            <p>{item.text}</p><span className="arrow">↗</span>
          </article>)}
        </div>
      </section>

      <section className="marquee" aria-label="Brand statement"><div>QUALITY · TRUST · CONNECTION · QUALITY · TRUST · CONNECTION ·&nbsp;</div></section>

      <section id="contact" className="contact shell">
        <p className="section-label">( Contact )</p>
        <div className="contact-main"><p>Have a product,<br />a market, or an idea?</p><a href="mailto:hello@kowa-trading.jp">Let’s talk<span>↗</span></a></div>
        <footer><span>© 2026 KŌWA TRADING CO., LTD.</span><span>Tokyo, Japan</span><a href="#top">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
