using DynamicWindows.Models;
using Microsoft.JSInterop;

namespace DynamicWindows.ViewModels
{
    public class JsWindowViewModel : ViewModelBase<IJSObjectReference>
    {
        private JsWindowModel _model;
        public JsWindowModel Model
        {
            get => _model;
        }
        public int Id
        {
            get => _model.Id;
        }
        public JsWindowViewModel(JsWindowModel window, IJSObjectReference canvas) : base(canvas) 
        {
            _model = window;
        }

        public override async void OnContextChanged(IJSObjectReference? context)
        {
            await Task.CompletedTask;
        }
    }
}
