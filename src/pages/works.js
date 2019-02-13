import React from 'react'

const WorkLine = ({ wip, title = 'Work title', subtitle = '', url }) => {
  return (
    <li className="pb4 f5">
      <div className="">
        {url && (
          <a className="black" href={url}>
            {title}
          </a>
        )}
        {!url && title}{' '}
        {wip && <span className="gray tracked f6 fw4 pl2"></span>}
      </div>
      <p className="ma0 pa0 pt1 lh-copy f6 gray">{subtitle}</p>
    </li>
  )
}

class IndexPage extends React.Component {
  render() {
    return (
      <div className="w-100 z-999">
        <div className="pt6 mw8 ph4 center f4 fade">
          <h2 className="f1 fw3 lh-solid">Works &<br/> research</h2>
          <div className="pt4">
            <h3 className="fw2 f3 pb3">Web Apps/Sites</h3>
            <ul className="ma0 pa0">
              <WorkLine
                url="http://bormioli-paris.now.sh"
                title="Bormioli Pharma"
                subtitle="Progressive Web App per tablet iPad per evento fieristico a Parigi e fornita agli operatori commerciali di Bormioli Pharma. Sviluppata in breve tempo (meno di 2 settimane) con React/Next. Supporto offline, animazioni con TweenMax e fisica custom in Javascript per scroll e drag."
              />
              <WorkLine
                video
                url=""
                title="Intellitower – Celli Group"
                subtitle="Interfaccia per sistema embedded realizzata per Celli @ Accurat. L'interfaccia è direttamente integrata nell'erogatore di bevande Intellitower, distribuito nel mercato asiatico da Celli Group. Il tutto gira su un sistema embedded basato su Yocto Linux e Chromium."
              />
              <WorkLine
                url="http://hiddentribe.us"
                title="The Hidden Tribes"
                subtitle="Sito per il report di Hidden Tribes, sviluppato @ Accurat."
              />
            </ul>
          </div>
          <div className="pt4">
            <h3 className="fw2 f3 pb3">Web data viz</h3>
            <ul className="ma0 pa0">
            <WorkLine
                    url="https://www.dropbox.com/sh/6j16zkb2kgnxluy/AABDo9a_wXujEufcf2ELHx-Ba?dl=0"
                    video
                    title="Sanofi IMS"
                    subtitle="Internal Data Reporting tool sviluppato per dispositivi touch @ Accurat per Sanofi IMS."
                />
                <WorkLine
                    url="https://www.dropbox.com/s/ts40hz4f6ce5f74/unicredit-ada-demo.mov?dl=0"
                    video
                    title="Unicredit ada"
                    subtitle="Internal Data Reporting tool sviluppato per dispositivi touch @ Accurat per Unicredit."
                />
            </ul>
          </div>
          <div className="pt4">
            <h3 className="fw2 f3 pb3">Open Source / Personal research / Experiments</h3>
            <ul className="ma0 pa0">
                <WorkLine
                    url="https://www.shadertoy.com/user/omis"
                    title="ShaderToy"
                    subtitle="Profilo shadertoy con alcuni shader glsl scritti durante l'apprendimento."
                />
                <WorkLine
                    url="https://github.com/0m15/regl-2dplot"
                    title="Regl 2d plot"
                    subtitle="A 2d plot renderer made with regl and glsl"
                />
                <WorkLine
                    url="https://github.com/0m15/Resolver"
                    title="Music MetaData Resolver"
                    subtitle="A Music MetaData/Info resolver written a long time ago in Python while working at stereomood. It supports multiple sources and concurrent operations"
                />
            </ul>
        </div>
          <div className="pt4">
            <h3 className="fw2 f3 pb3">Unreleased projects</h3>
            <ul className="ma0 pa0">
              <WorkLine
                url="https://cranky-noyce-dcd3d0.netlify.com/"
                title="Enel - Christmas Selfie"
                wip={true}
                subtitle="Concept web app per Enel Energia. La richiesta era di una web app per smartphone che permettesse di scattare selfie e aggiungere sticker a tema natalizio per la condivisione successiva. La app renderizza su un singolo <canvas> ed è stata sviluppata con PIXI.js e custom shader glsl."
              />
              <WorkLine
                url="https://portadibassov2.netlify.com/it"
                title="Porta di Basso"
                wip={true}
                subtitle="Work in Progress/Concept per il ristorante Porta di Basso. Realizzato con PIXI.js, TweenMax (render engine basato su Webgl) e custom shader."
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default IndexPage
