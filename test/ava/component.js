const test = require('ava')
const xmpp = require('../../packages/component')

test.cb('component', t => {
  t.plan(9)

  const entity = new xmpp.Component()

  entity.on('connect', () => {
    t.pass()
  })

  entity.on('open', (el) => {
    t.true(el instanceof xmpp.xml.Element)
  })

  entity.on('authenticate', auth => {
    t.is(typeof auth, 'function')
    auth('mysecretcomponentpassword')
      .then(() => {
        t.pass('authenticated')
      })
  })

  entity.on('ready', () => {
    t.pass()
  })

  entity.on('online', (jid) => {
    t.true(jid instanceof xmpp.jid.JID)
    t.is(jid.toString(), 'component.localhost')
  })

  entity.start('xmpp:component.localhost:5347')
    .then((jid) => {
      t.true(jid instanceof xmpp.jid.JID)
      t.is(jid.toString(), 'component.localhost')
    })
    .then(() => {
      t.end()
    })
})
