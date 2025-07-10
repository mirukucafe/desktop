const RPC = require('discord-rpc');

const clientId = '1392848530028105831';
const startTimestamp = Date.now();

RPC.register(clientId);
const rpc = new RPC.Client({ transport: 'ipc' });

function updateActivity(title, url) {
  const activity = toActivity(title, url);
  
  // Debug logging to see what's being sent
  console.log('Setting activity:', JSON.stringify(activity, null, 2));
  
  rpc.setActivity({
    ...activity,
    largeImageKey: 'logo',
    largeImageText: 'Miruku.cafe',
    smallImageKey: 'online',
    startTimestamp
  }).then(() => {
    console.log('Activity set successfully');
  }).catch((error) => {
    console.error('Failed to set activity:', error);
  });
}

function toActivity(title, url) {
  if (!title) {
    return { 
      details: 'Miruku.cafe', 
      state: 'Online',
      buttons: [
        { label: 'Sign up', url: 'https://miruku.cafe' }
      ]
    };
  }

  const [sectionRaw] = title.split('|');
  const section = sectionRaw.trim();

  // Base buttons that are always present
  const baseButtons = [
    { label: 'Sign up', url: 'https://miruku.cafe' }
  ];

  if (section.startsWith('Timeline')) {
    return { 
      details: 'Browsing timeline', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Note')) {
    // Use the actual URL from webview if available
    const noteUrl = url || 'https://miruku.cafe';
    
    return { 
      details: 'Reading a post', 
      state: 'Online',
      buttons: [
        { label: 'View Post', url: noteUrl },
        ...baseButtons
      ]
    };
  }
  if (section.startsWith('(@')) {
    // Use the actual URL from webview if available
    const profileUrl = url || 'https://miruku.cafe';
    
    return { 
      details: `Viewing profile ${section.slice(1, -1)}`, 
      state: 'Online',
      buttons: [
        { label: 'View Profile', url: profileUrl },
        ...baseButtons
      ]
    };
  }
  if (section.startsWith('@')) {
    // Use the actual URL from webview if available
    const profileUrl = url || 'https://miruku.cafe';
    
    return { 
      details: `Viewing profile ${section}`, 
      state: 'Online',
      buttons: [
        { label: 'View Profile', url: profileUrl },
        ...baseButtons
      ]
    };
  }
  if (section.startsWith('Notifications')) {
    return { 
      details: 'Checking notifications', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Explore')) {
    return { 
      details: 'Exploring', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Search')) {
    return { 
      details: 'Searching', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Favorites')) {
    return { 
      details: 'Viewing favourites', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Drive')) {
    return { 
      details: 'Managing files', 
      state: 'Online',
      buttons: baseButtons
    };
  }
  if (section.startsWith('Settings')) {
    return { 
      details: 'Adjusting settings', 
      state: 'Online',
      buttons: baseButtons
    };
  }

  return { 
    details: 'Miruku.cafe', 
    state: 'Online',
    buttons: baseButtons
  };
}

function setupPresence(window) {
  rpc.on('ready', () => {
    console.log('Discord RPC is ready!');
    updateActivity(window.getTitle(), window.webContents.getURL());
  });

  rpc.login({ clientId }).catch(console.error);

  window.on('page-title-updated', (_e, title) => {
    updateActivity(title, window.webContents.getURL());
  });

  window.on('closed', () => {
    rpc.destroy();
  });

  return rpc;
}

module.exports = { setupPresence }; 