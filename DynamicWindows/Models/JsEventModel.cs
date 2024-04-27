using System.Text.Json.Serialization;

namespace DynamicWindows.Models
{
    public class JsEventModel
    {
        [JsonPropertyName("eventType")]
        public int EventType { get; set; }
        [JsonPropertyName("canvasId")]
        public int CanvasId { get; set; }
    }
}
