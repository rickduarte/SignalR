using Microsoft.AspNet.SignalR.Client.Http;
using Microsoft.Owin.Testing;
using Owin;
using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading;

namespace Microsoft.AspNet.SignalR.Hosting.Memory
{
    public class MemoryHost : DefaultHttpClient, IDisposable
    {
        private static int instanceId;
        private TestServer _host;

        public string InstanceName { get; set; }        

        public MemoryHost()
        {
            var id = Interlocked.Increment(ref instanceId);
            InstanceName = Process.GetCurrentProcess().ProcessName + id;
        }

        public void Configure(Action<IAppBuilder> startup)
        {
            _host = TestServer.Create(startup);
        }


        protected override HttpMessageHandler CreateHandler()
        {
            return _host.Handler;
        }

        public void Dispose()
        {
            _host.Dispose();
        }        
    }
}
