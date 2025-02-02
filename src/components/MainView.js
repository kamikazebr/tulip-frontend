import React, { useCallback, useEffect, useState } from 'react'
import { Layout, Root, ScrollView, useViewport } from '@1hive/1hive-ui'
import MenuPanel from './MenuPanel'
import Header from './Header/Header'

function MainView({ children }) {
  const { width: vw, below } = useViewport()
  const compactMode = below('medium')
  const [menuPanelOpen, setMenuPanelOpen] = useState(!compactMode)

  // const [openPreferences, closePreferences, preferenceOption] = usePreferences()

  const toggleMenuPanel = useCallback(
    () => setMenuPanelOpen(opened => !opened),
    []
  )

  const handleCloseMenuPanel = useCallback(() => setMenuPanelOpen(false), [])

  const handleOpenPage = useCallback(() => {
    if (compactMode) {
      handleCloseMenuPanel()
    }
  }, [compactMode, handleCloseMenuPanel])

  useEffect(() => {
    setMenuPanelOpen(!compactMode)
  }, [compactMode])

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        height: 100vh;
      `}
    >
      <div
        css={`
          flex-shrink: 0;
        `}
      >
        <Header compactMode={compactMode} toggleMenuPanel={toggleMenuPanel} />
      </div>
      <div
        css={`
          flex-grow: 1;
          flex-shrink: 1;
          height: 0;
          display: flex;
        `}
      >
        <div
          css={`
            flex-shrink: 0;
            z-index: 3;
            height: 100%;
          `}
        >
          <MenuPanel
            autoClosing={compactMode}
            opened={menuPanelOpen}
            onMenuPanelClose={handleCloseMenuPanel}
            onOpenPage={handleOpenPage}
          />
        </div>
        <Root.Provider
          css={`
            flex-grow: 1;
            height: 100%;
            position: relative;
          `}
        >
          <ScrollView>
            <div
              css={`
                display: flex;
                flex-direction: column;
                height: 100%;
              `}
            >
              <div
                css={`
                  flex: 1 0 auto;
                `}
              >
                <Layout parentWidth={vw} paddingBottom={0}>
                  {children}
                </Layout>
              </div>
            </div>
          </ScrollView>
        </Root.Provider>
      </div>
    </div>
  )
}

export default MainView
