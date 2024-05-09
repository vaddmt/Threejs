using DynamicWindows.Models.Enums;

namespace DynamicWindows.Models
{
    public class JsCommandModel
    {
        public ECommandType Type { get; set; }
        public object? Argument { get; set; }
    }
}
