using DynamicWindows.Models;
using Microsoft.JSInterop;

namespace DynamicWindows.ViewModels
{
    public class JsWindowViewModel : ViewModelBase<IJSObjectReference>
    {
        private JsWindowModel _model;
        public JsWindowViewModel(int id, IJSObjectReference canvas) : base(canvas) 
        {
            _model = new JsWindowModel()
            {
                Id = id,
            };
        }
        public int Id
        {
            get => _model.Id;
        }

        public override async void OnContextChanged(IJSObjectReference? context)
        {
            await Task.CompletedTask;
        }
    }
}
