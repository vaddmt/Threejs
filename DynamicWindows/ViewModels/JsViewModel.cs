using DynamicWindows.Models;
using DynamicWindows.Models.Enums;
using DynamicWindows.Utilities;
using Microsoft.JSInterop;
using System.Text.Json;

namespace DynamicWindows.ViewModels
{
    public class JsViewModel : ViewModelBase<IJSRuntime>
    {
        private int _counter;
        private IJSObjectReference? _jsModule;
        private Dictionary<int, JsWindowViewModel> _jsWindows = new();
        public JsWindowViewModel[] Windows
        {
            get => _jsWindows.Values.ToArray();
        }
        public JsViewModel(IJSRuntime? jsRuntime) : base(jsRuntime)
        {

        }
        /// <summary>
        /// Initializing js modules
        /// </summary>
        /// <param name="context"></param>
        public override async void OnContextChanged(IJSRuntime? context)
        {
            if (_jsModule is not null)
            {
                await _jsModule.InvokeVoidAsync("dispose");
                _jsModule = null;
            }

            foreach (JsWindowViewModel window in _jsWindows.Values)
            {
                if (window.Context is not null)
                {
                    await window.Context.InvokeVoidAsync("dispose");
                }
            }
            _jsWindows = new Dictionary<int, JsWindowViewModel>();

            if (context is null)
            {
                return;
            }

            try
            {
                _jsModule = await context.InvokeAsync<IJSObjectReference>("import", "./js/main.js");
                await _jsModule.InvokeVoidAsync("load");
            }
            catch (JSDisconnectedException ex)
            {
                Console.WriteLine("Error: ThreejsViewModel exception\n" + ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine("Error: ThreejsViewModel exception\n" + ex.Message);
            }
        }

        public async void AddCanvas()
        {
            if (_jsModule is null)
            {
                return;
            }

            try
            {
                int key = _counter++;
                JsWindowModel window = new JsWindowModel() 
                {
                    Id = key
                };

                IJSObjectReference jsCanvas = await _jsModule.InvokeAsync<IJSObjectReference>("create", window);
                _jsWindows.Add(key, new JsWindowViewModel(window, jsCanvas));
            }
            catch
            {
                Console.WriteLine("Error: Canvas create exception");
            }

            await Task.CompletedTask;
        }

        public async void DelCanvas(int id)
        {
            _jsWindows.Remove(id);
            await Task.CompletedTask;
        }

        public async void CmdUndo()
        {
            if (_jsModule is null)
            {
                return;
            }

            await _jsModule.InvokeVoidAsync("command", new JsCommandModel()
            {
                Type = ECommandType.Undo
            });
        }

        public async void CmdRedo()
        {
            if (_jsModule is null)
            {
                return;
            }

            await _jsModule.InvokeVoidAsync("command", new JsCommandModel()
            {
                Type = ECommandType.Redo
            });
        }

        public async void CmdLoadCube()
        {
            if (_jsModule is null)
            {
                return;
            }

            await _jsModule.InvokeVoidAsync("command", new JsCommandModel()
            {
                Type = ECommandType.Load,
                Argument = Primitives.Cube
            });
        }

        public async void CmdLoadPyramid()
        {
            if (_jsModule is null)
            {
                return;
            }

            await _jsModule.InvokeVoidAsync("command", new JsCommandModel()
            {
                Type = ECommandType.Load,
                Argument = Primitives.Pyramid
            });
        }

        public async void ReadEvent()
        {
            if (_jsModule is null)
            {
                return;
            }

            string json = await _jsModule.InvokeAsync<string>("readEvent");
            JsEventModel? jsEvent = JsonSerializer.Deserialize<JsEventModel>(json);
            
            if (jsEvent is null)
            {
                return;
            }

            switch (jsEvent.EventType)
            {
                case 0:
                    // default event, do nothing
                    break;
                case 1:
                    // windowClose, remove canvas
                    DelCanvas(jsEvent.CanvasId);
                    break;
                default:
                    Console.WriteLine("Error: ThreejsViewModel, unknown js event");
                    break;
            }
        }

        public async void Dispose()
        {
            await Task.CompletedTask;
        }
    }
}
